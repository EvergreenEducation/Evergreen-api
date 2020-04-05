import { Offers, DataFields } from '@/models';
import { compact } from 'lodash';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.offerResource = finale.resource({
      model: Offers,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.offerResource.create.write_after(async (req, res, context) => {
      let { category, topics = [] } = req.body;
      category = Number(category);

      const datafields = compact([
        category,
        ...topics,
      ]);

      if (datafields.length) {
        const datafield = await DataFields.findAll({
          where: {
            id: datafields,
          },
        });
        await context.instance.addDataFields(datafield);
        const offerInstance = await Offers.scope('with_datafields').findByPk(context.instance.id);
        context.instance = offerInstance;
      }

      return context.continue;
    });

    this.offerResource.update.write_after(async (req, res, context) => {
      let offerInstance = await Offers.scope('with_datafields').findByPk(context.instance.id);
      let {
        category: newCategory,
        topics: newTopics = [],
      } = req.body;

      newCategory = Number(newCategory);

      const datafields = compact([
        newCategory,
        ...newTopics,
      ]);

      if (datafields.length) {
        const datafield = await DataFields.findAll({
          where: {
            id: datafields,
          },
        });

        await context.instance.setDataFields(datafield);
        offerInstance = await Offers.scope('with_datafields').findByPk(context.instance.id);
        context.instance = offerInstance;
      }

      return context.continue;
    });
  }
}
