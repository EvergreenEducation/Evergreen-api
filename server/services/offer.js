import { Offer } from '@/models';
import inflection from 'inflection';

class OfferService {
  async connectRelatedOffers(resourceInstance, otherOffers = []) {
    const instanceId = resourceInstance.id;

    if (otherOffers.length) {
      await resourceInstance.addRelatedOffers(otherOffers, {
        through: {
          type: 'related',
        },
      });
    }

    return {
      includeLoadInstruction: {
        model: Offer,
        as: 'RelatedOffers',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
          where: { type: 'related' },
        },
      },
    };
  }

  async connectPrereqOffers(resourceInstance, otherOffers = []) {
    const instanceId = resourceInstance.id;

    if (otherOffers.length) {
      await resourceInstance.addPrerequisiteOffers(otherOffers, {
        through: {
          type: 'prerequisite',
        },
      });
    }

    return {
      includeLoadInstruction: {
        model: Offer,
        as: 'PrerequisiteOffers',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
          where: { type: 'prerequisite' },
        },
      },
    };
  }
}

export default new OfferService();
