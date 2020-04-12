import { Pathway, Offer, } from '@/models';
import { compact } from 'lodash';
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
      const { topics = [], groups_of_offers = [] } = req.body;

      console.log('groups'.white, groups_of_offers);

      const datafields = compact([...topics]);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(
        context.instance,
        datafields,
        'pathways_datafields',
        'pathway_id',
      );

      const {
        includeLoadInstruction: groupsLoad,
      } = await PathwayService.connectGroupsOfOffers(context.instance, groups_of_offers);

      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad, groupsLoad]);

      return context.continue;
    });

    this.pathwayResource.update.write_after(async (req, res, context) => {
      const { topics: newTopics = [], groups_of_offers } = req.body;

      const datafields = compact([
        ...newTopics,
      ]);

      const {
        includeLoadInstruction: groupsLoad,
      } = await PathwayService.connectGroupsOfOffers(context.instance, groups_of_offers);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(
        context.instance,
        datafields,
        'pathways_datafields',
        'pathway_id',
      );
      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad, groupsLoad]);

      return context.continue;
    });
  }
}
