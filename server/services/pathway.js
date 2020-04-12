import { Offer, OffersPathways } from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';
import colors from 'colors';

class PathwayService {
  async connectGroupsOfOffers(resourceInstance, groupsOfOffers = []) {
    const instanceId = resourceInstance.id;

    if (groupsOfOffers.length) {
      for (const group of groupsOfOffers) {
        console.log('group'.blue, group);
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
