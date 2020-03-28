import { DataFields } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.providerResource = finale.resource({
      model: DataFields,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
