import { Pathway, DataField } from '@/models';
import { compact, filter } from 'lodash';
import DataFieldService from '@/services/datafield';
import SequelizeHelperService from '@/services/sequelize-helper';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.pathwayResource = finale.resource({
      model: Pathway,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.pathwayResource.create.write_after(async (req, res, context) => {
      const { topics = [] } = req.body;

      const datafields = compact([...topics]);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);
      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad]);

      // Find all the offer instances

      // context.instance.addOffers(OfferInstances, { <-- gonna be in a loop
      //  through: {
      //   group_name: 'lorem ipsum'
      //  },
      // });

      return context.continue;
    });

    this.pathwayResource.update.write_after(async (req, res, context) => {
      const { topics: newTopics = [] } = req.body;

      const datafields = compact([
        ...newTopics,
      ]);

      await context.instance.setDataFields([]);
      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);
      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad]);

      return context.continue;
    });
  }
}
