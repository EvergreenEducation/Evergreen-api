import { Offer, OffersPathways } from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';

class PathwayService {
  async loadOffersPathways(pathway) {
    return OffersPathways.findAll({
      where: {
        pathway_id: pathway.id,
      },
    });
  }

  async connectGroupsOfOffers(resourceInstance, groupsOfOffers = []) {
    if (groupsOfOffers.length) {
      await OffersPathways.destroy({
        force: true,
        where: {
          pathway_id: resourceInstance.id,
        },
      });

      for (const group of groupsOfOffers) {
        let extra = {
          group_name: group.group_name,
        };

        if (group.semester) {
          extra = { ...extra, semester: group.semester };
        }

        if (group.year) {
          extra = { ...extra, year: group.year };
        }

        await SequelizeHelperService.syncM2M({
          instance: resourceInstance,
          newValues: group.offer_ids,
          targetModel: OffersPathways,
          foreignKey: 'pathway_id',
          otherKey: 'offer_id',
          extra,
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
