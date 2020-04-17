import { Enrollment } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.enrollmentResource = finale.resource({
      model: Enrollment,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
