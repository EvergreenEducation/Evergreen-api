import { Offer, DataField, OffersOffers } from '@/models';
import {
  compact, uniqWith, concat, map,
  keyBy,
} from 'lodash';
import DataFieldService from '@/services/datafield';
import OfferService from '@/services/offer';
import SequelizeHelperService from '@/services/sequelize-helper';
import colors from 'colors';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.offerResource = finale.resource({
      model: Offer,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.offerResource.create.write_after(async (req, res, context) => {
      const {
        category,
        topics = [],
        related_offers = [],
        prerequisites = [],
      } = req.body;

      const datafields = compact([
        category,
        ...topics,
      ]);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);
      const { includeLoadInstruction: relatedOffersLoad } = await OfferService.connectRelatedOffers(context.instance, related_offers);
      const { includeLoadInstruction: prereqOffersLoad } = await OfferService.connectPrereqOffers(context.instance, prerequisites);

      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad, relatedOffersLoad, prereqOffersLoad]);

      return context.continue;
    });

    this.offerResource.update.write_after(async (req, res, context) => {
      const {
        category: newCategory,
        topics: newTopics = [],
        related_offers = [],
        prerequisites = [],
      } = req.body;

      const datafields = compact([
        newCategory,
        ...newTopics,
      ]);

      await context.instance.setDataFields([]);
      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);

      await OffersOffers.destroy({
        where: {
          offer_id: context.instance.id,
          type: 'prerequisite',
        },
      });

      const { includeLoadInstruction: prereqOffersLoad } = await OfferService.connectPrereqOffers(context.instance, prerequisites);

      await OffersOffers.destroy({
        where: {
          offer_id: context.instance.id,
          type: 'related',
        },
      });
      const { includeLoadInstruction: relatedOffersLoad } = await OfferService.connectRelatedOffers(context.instance, related_offers);


      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad, relatedOffersLoad, prereqOffersLoad]);

      return context.continue;
    });
  }
}
