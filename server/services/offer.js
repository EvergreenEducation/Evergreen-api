import { Offer, OffersOffers, Enrollment } from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';

const moment = require('moment');

class OfferService {
  async addToModel(resourceInstance, otherOffers, alias, type, instanceMethod) {
    if (otherOffers.length) {
      await resourceInstance[instanceMethod](otherOffers, {
        through: { type },
      });
    }

    return {
      includeLoadInstruction: {
        model: Offer,
        as: alias,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
          where: { type },
        },
      },
    };
  }

  async addRelatedOffers(resourceInstance, otherOffers = []) {
    return this.addToModel(
      resourceInstance,
      otherOffers,
      'RelatedOffers',
      'related',
      'addRelatedOffers',
    );
  }

  async addPrereqOffers(resourceInstance, otherOffers = []) {
    return this.addToModel(
      resourceInstance,
      otherOffers,
      'PrerequisiteOffers',
      'prerequisite',
      'addPrerequisiteOffers',
    );
  }

  async syncToModel(resourceInstance, newValues, alias, type) {
    await SequelizeHelperService.syncM2M({
      instance: resourceInstance,
      newValues,
      targetModel: OffersOffers,
      foreignKey: 'offer_id',
      otherKey: 'other_offer_id',
      extra: { type },
    });

    return {
      includeLoadInstruction: {
        model: Offer,
        as: alias,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
          where: { type },
        },
      },
    };
  }

  async connectRelatedOffers(resourceInstance, newValues = []) {
    return this.syncToModel(
      resourceInstance,
      newValues,
      'RelatedOffers',
      'related',
    );
  }

  async connectPrereqOffers(resourceInstance, newValues = []) {
    return this.syncToModel(
      resourceInstance,
      newValues,
      'PrerequisiteOffers',
      'prerequisite',
    );
  }

  async checkStudentEnrollStatus(student_id, offer_id, derived_year = 0) {
    const enrollment = await Enrollment.findOne({
      where: {
        student_id,
        offer_id,
      },
    });

    let status = enrollment ? enrollment.status : 'Unenrolled';
    let enrollYear = enrollment
      ? new moment(enrollment.start_date || enrollment.createdAt).year() +
        derived_year
      : new moment().year();

    return {
      status,
      year: enrollYear,
    };
  }
}

export default new OfferService();
