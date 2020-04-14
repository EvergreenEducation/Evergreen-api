import { Offer, OffersPathways } from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';

class PathwayService {
  async loadOffers(pathway) {
    return OffersPathways.findAll({
      where: {
        pathway_id: pathway.id,
      },
    });
  }

  async connectGroupsOfOffers(resourceInstance, groupsOfOffers = []) {
    if (groupsOfOffers.length) {
      for (const group of groupsOfOffers) {
        await SequelizeHelperService.syncM2M({
          instance: resourceInstance,
          newValues: group.offer_ids,
          targetModel: OffersPathways,
          foreignKey: 'pathway_id',
          otherKey: 'offer_id',
          extra: {
            group_name: group.group_name,
          },
        });
      }
    }

    return {
      includeLoadInstruction: {
        as: 'GroupsOfOffers',
        attributes: ['id', 'name'],
        model: Offer,
        through: { attributes: ['group_name'] },
      },
    };
  }
}

export default new PathwayService();
