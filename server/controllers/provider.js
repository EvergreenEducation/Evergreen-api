import {
  compact, filter, map, property,
  isEqual, differenceWith, find,
} from 'lodash';

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

    this.providerResource.update.write_after(async (req, res, context) => {
      let providerInstance = await Provider.scope('with_datafields').findByPk(context.instance.id);
      let {
        type: newProviderType,
        topics: newTopics,
      } = req.body;

      newProviderType = Number(newProviderType);

      const myProviderType = find(providerInstance.dataValues.DataFields, ['type', 'provider']).dataValues.id;

      const myTopics = map(
        filter(providerInstance.dataValues.DataFields, ['type', 'topic']),
        property('dataValues.id'),
      );

      const difference = differenceWith(myTopics, newTopics);

      if (isEqual(myProviderType, newProviderType) && !difference.length) {
        context.instance = providerInstance;
        return context.continue;
      }

      if (!isEqual(myProviderType, newProviderType) && !difference.length) {
        const newDataField = await DataFields.findOne({ where: { id: newProviderType } });

        const withoutMyProviderType = filter(
          providerInstance.dataValues.DataFields,
          d => (d.dataValues.id !== myProviderType),
        );

        withoutMyProviderType.push(newDataField);

        await context.instance.setDataFields(withoutMyProviderType);
        providerInstance = await Provider.scope('with_datafields').findByPk(context.instance.id);
        context.instance = providerInstance;
        return context.continue;
      }

      const datafields = compact([
        newProviderType,
        ...newTopics,
      ]);

      if (datafields.length) {
        const datafield = await DataFields.findAll({
          where: {
            id: datafields,
          },
        });

        await context.instance.setDataFields(datafield);
        providerInstance = await Provider.scope('with_datafields').findByPk(context.instance.id);
        context.instance = providerInstance;
      }

      return context.continue;
    });
  }
}
