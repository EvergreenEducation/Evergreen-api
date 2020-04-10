import {
  File, Provider, Offer, OffersOffers,
} from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';

const express = require('express');

const router = express.Router();

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.fileResource = finale.resource({
      model: File,
      endpoints: [prefix, `${prefix}/:id`],
    });

    router.post('/generate_presigned_url', this.generatePresignedUrl);
    app.use(prefix, router);
  }

  // async test(req, res) {
  // const offer = await Offer.findByPk(59);
  // SequelizeHelperService.syncM2M({
  //   instance: offer,
  //   newValues: [2, 1, 5],
  //   targetModel: OffersOffers, // providers_datafields Path
  //   foreignKey: 'offer_id',
  //   otherKey: 'other_offer_id',
  //   extra: { type: 'prerequisite' },
  // });
  // }

  generatePresignedUrl(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({
        message: 'File name is empty.',
      });
    }

    return res.status(200).send({
      url: File.generatePresignedUrl(name),
    });
  }
}
