import * as express from 'express';
import UserService from '@/services/user';
import { User } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.userResource = finale.resource({
      model: User,
      endpoints: [prefix, `${prefix}/:id`],
    });

    const router = express.Router();
    router.get('/:id/me', this.me);
    app.use(prefix, router);
  }

  async me(_req, res) {
    res.send('hello');
  }
}
