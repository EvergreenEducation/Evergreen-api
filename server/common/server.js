import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import requestLogger from 'morgan';
import cors from 'cors';
import auth from '@/libs/auth';
import fs from 'fs';
import l from './logger';

require('express-async-errors');

const app = new Express();
const { exit } = process;


export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: false, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(requestLogger('tiny'));
    app.use(cors());
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => l.info(
      `up and running in ${
        'development'} @: ${os.hostname()} on port: ${p}}`,
    );

    this.routes(app);
    auth(app);
    http.createServer(app).listen(port, welcome(port));
    // oas(app, this.routes).then(() => {
    // }).catch(e => {
    //   l.error(e);
    //   exit(1);
    // });

    return app;
  }
}
