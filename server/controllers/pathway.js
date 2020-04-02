import { Pathways } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.pathwayResource = finale.resource({
      model: Pathways,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
