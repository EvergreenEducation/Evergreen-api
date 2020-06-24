import * as express from 'express';
import UserService from '@/services/user';
import { User, Provider, Student } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.userResource = finale.resource({
      model: User,
      endpoints: [prefix, `${prefix}/:id`],
      include: [{ model: Provider }, { model: Student }],
    });
  }
}
