import { compact } from 'lodash';

import { Provider, DataFields } from '@/models';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.providerResource = finale.resource({
      model: Provider,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.providerResource.create.write_after(async (req, res, context) => {
      let { type, topics = [] } = req.body;
      type = Number(type);

      const datafields = compact([
        type,
        ...topics,
      ]);

      if (datafields.length) {
        const datafield = await DataFields.findAll({
          where: {
            id: datafields,
          },
        });
        await context.instance.addDataFields(datafield);
        const providerInstance = await Provider.scope('with_datafields').findByPk(context.instance.id);
        context.instance = providerInstance;
      }

      return context.continue;
    });
  }
}
