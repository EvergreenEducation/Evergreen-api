import { Pathways, DataFields } from '@/models';
import { compact, filter } from 'lodash';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.pathwayResource = finale.resource({
      model: Pathways,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.pathwayResource.create.write_after(async (req, res, context) => {
      const { topics = [] } = req.body;

      const datafields = compact([...topics]);

      if (datafields.length) {
        const datafield = await DataFields.findAll({
          where: {
            id: datafields,
          },
        });
        await context.instance.addDataFields(datafield);
        const pathwayInstance = await Pathways.scope('with_datafields').findByPk(context.instance.id);
        context.instance = pathwayInstance;
      }

      return context.continue;
    });

    this.pathwayResource.update.write_after(async (req, res, context) => {
      let pathwayInstance = await Pathways.scope('with_datafields').findByPk(context.instance.id);
      const { topics: newTopics = [] } = req.body;

      const datafields = compact([
        ...newTopics,
      ]);

      if (!datafields.length) {
        await context.instance.setDataFields([]);
        pathwayInstance = await Pathways.scope('with_datafields').findByPk(context.instance.id);
        context.instance = pathwayInstance;
        return context.continue;
      }

      if (datafields.length) {
        const datafield = await DataFields.findAll({
          where: {
            id: datafields,
          },
        });

        await context.instance.setDataFields(datafield);
        pathwayInstance = await Pathways.scope('with_datafields').findByPk(context.instance.id);
        context.instance = pathwayInstance;
      }

      return context.continue;
    });
  }
}
