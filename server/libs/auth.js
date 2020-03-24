import env from '@/common/env';
import Auth0Strategy from 'passport-auth0';
import passport from 'passport';
import querystring from 'querystring';
import url from 'url';
import session from 'express-session';

const strategy = new Auth0Strategy(
  {
    domain: env.AUTH0_BASE_URL,
    clientID: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    callbackURL: env.AUTH0_CALLBACK_URL,
    state: true,
  },
  ((accessToken, refreshToken, extraParams, profile, done) =>
  /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */

    done(null, profile)
  ),
);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default app => {
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: false },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get(
    '/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }),
    (req, res) => {
      console.log('==================', req);
      res.redirect('/');
    },
  );
  // Perform the final stage of authentication and redirect to previously requested URL or '/user'
  app.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
      console.log(user, info);
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, err => {
        if (err) { return next(err); }
        const { returnTo } = req.session;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.logout();

    let returnTo = `${req.protocol}://${req.hostname}`;
    const port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo += `:${port}`;
    }

    const logoutURL = new url.URL(
      util.format('https://%s/v2/logout', env.AUTH0_DOMAIN),
    );
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo,
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
  });
};
