import { Offers } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.offerResource = finale.resource({
      model: Offers,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
