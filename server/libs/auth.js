import env from '@/common/env';
import Auth0Strategy from 'passport-auth0';
import passport from 'passport';
import querystring from 'querystring';
import url from 'url';
import session from 'express-session';
import util from 'util';
import UserService from '@/services/user';
import { sequelizeInstance } from '@/models';
import fs from 'fs';
import rootPath from 'app-root-path';

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const admins = JSON.parse(fs.readFileSync(`${rootPath}/admin.json`, 'utf-8'));

const strategy = new Auth0Strategy(
  {
    domain: env.AUTH0_BASE_URL,
    clientID: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    callbackURL: env.AUTH0_CALLBACK_URL,
    state: true,
  },
  (accessToken, refreshToken, extraParams, profile, done) =>
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    done(null, profile),
);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default app => {
  app.use(
    session({
      store: new SequelizeStore({
        db: sequelizeInstance,
        tableName: 'sessions',
      }),
      secret: env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: false,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/login', passport.authenticate('auth0', { scope: 'openid email' }), (req, res) => {
    res.redirect('/');
  });
  // Perform the final stage of authentication and redirect to previously requested URL or '/user'
  app.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }

      const isAdmin = admins.includes(user._json.email);
      const adminData = isAdmin ? { role: 'admin' } : {};

      return UserService.findOrCreate(user._json, adminData)
        .then(internalUser => {
          req.logIn(internalUser, loginErr => {
            if (loginErr) {
              return next(loginErr);
            }
            const { returnTo } = req.session;
            return res.redirect(`http://localhost:3000/auth/user?user_id=${internalUser.id}`);
          });
        })
        .catch(createError => {
          if (createError.message === 'Your email has not verified.') {
            return res.redirect(`http://localhost:3000/auth/email_not_verified`);
          }
          return next(createError);
        });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.session.destroy();
    req.logout();

    const returnTo = env.CLIENT_APP_URL;
    const port = req.connection.localPort;

    const logoutURL = new url.URL(util.format('https://%s/v2/logout', env.AUTH0_BASE_URL));
    const searchString = querystring.stringify({
      client_id: env.AUTH0_CLIENT_ID,
      returnTo,
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
  });
};
