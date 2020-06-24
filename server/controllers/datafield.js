import { DataField } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.datafieldResource = finale.resource({
      model: DataField,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
