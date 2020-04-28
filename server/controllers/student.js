import * as express from 'express';
import UserService from '@/services/user';
import { Student } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.userResource = finale.resource({
      model: Student,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
