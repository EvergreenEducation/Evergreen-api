import { Offer, OffersOffers } from '@/models';
import {
  compact, uniqWith, concat, map,
  keyBy,
} from 'lodash';
import DataFieldService from '@/services/datafield';
import colors from 'colors';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.offerResource = finale.resource({
      model: Offer,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.offerResource.create.write_after(async (req, res, context) => {
      let {
        category,
        topics = [],
        related_offers = [],
        prerequisites = [],
      } = req.body;
      category = Number(category);

      console.log('sib method'.blue, context.instance.addSiblingOffer);

      if (related_offers.length || prerequisites.length) {
        // let offerInstances = uniqWith(concat(related_offers, prerequisites));

        // offerInstances = await Offers.findAll({
        //   where: {
        //     id: offerInstances,
        //   },
        // });

        // const keyedOffers = keyBy(offerInstances, offer => offer.dataValues.id);

        for (let i = 0; i < related_offers.length; i += 1) {
          Offer.findOne({
            where: { id: related_offers[i] },
          }).then(offer => {
            console.log('offer'.white, offer);
            console.log('addSiblingOffer'.cyan, offer.addSiblingOffer);

            // return offer.addSiblingOffer(
            //   context.instance,
            //   {
            //     type: 'related',
            //     relationship: 'related',
            //   },
            // );

            return offer.addSiblingOffer(
              context.instance,
              {
                through: {
                  type: 'related',
                  relationship: 'related',
                },
              },
            );
          });
        }
      }

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
