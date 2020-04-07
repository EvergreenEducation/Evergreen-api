import { Offer, DataField } from '@/models';
import { compact } from 'lodash';
import DataFieldService from '@/services/datafield';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.offerResource = finale.resource({
      model: Offer,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.offerResource.create.write_after(async (req, res, context) => {
      let { category, topics = [] } = req.body;
      category = Number(category);

      const datafields = compact([
        category,
        ...topics,
      ]);

      context.instance = await DataFieldService.addToModel(context.instance, datafields);

      return context.continue;
    });

    this.offerResource.update.write_after(async (req, res, context) => {
      let {
        category: newCategory,
        topics: newTopics = [],
      } = req.body;

      newCategory = Number(newCategory);

      const datafields = compact([
        newCategory,
        ...newTopics,
      ]);

      await context.instance.setDataFields([]);
      context.instance = await DataFieldService.addToModel(context.instance, datafields);
      return context.continue;
    });
  }
}
