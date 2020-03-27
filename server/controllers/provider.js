
import { Provider } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.providerResource = finale.resource({
      model: Provider,
      endpoints: [prefix, `${prefix}/:id`],
    });
  }
}
