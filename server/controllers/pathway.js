import { Pathway, DataField, Offer, OffersPathways } from '@/models';
import { compact, filter } from 'lodash';
import DataFieldService from '@/services/datafield';
import SequelizeHelperService from '@/services/sequelize-helper';
import PathwayService from '@/services/pathway';
import colors from 'colors';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.pathwayResource = finale.resource({
      model: Pathway,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.pathwayResource.create.write_after(async (req, res, context) => {
      const { topics = [], groups_of_offers } = req.body;

      console.log('groups'.white, groups_of_offers);

      const datafields = compact([...topics]);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);

      if (groups_of_offers.length) {
        for (let i = 0; i < groups_of_offers.length; i += 1) {
          if (!groups_of_offers[i]) {
            break;
          }
          await context.instance.addOffers(groups_of_offers[i].offers, {
            through: {
              group_name: groups_of_offers[i].name,
            },
          });

          const instructions = {
            model: Offer,
            through: { attributes: ['group_name'] },
          };

          context.instance = await SequelizeHelperService.load(context.instance, [instructions]);
        }
      }

      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad]);

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
