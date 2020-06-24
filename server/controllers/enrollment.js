import { Enrollment, Offer } from '@/models';
import { v4 as uuidv4 } from 'uuid';

const express = require('express');

const router = express.Router();

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.enrollmentResource = finale.resource({
      model: Enrollment,
      endpoints: [prefix, `${prefix}/:id`],
      include: [{ model: Offer, attributes: ['name'] }],
    });

    router.post('/batch_create', this.batchCreate);
    app.use(prefix, router);
  }

  async batchCreate(req, res) {
    const { offer_id, batch, provider_id, start_date } = req.body;
    const enrollments = [];

    for (let i = 0; i < batch; i += 1) {
      enrollments.push({
        offer_id,
        provider_id,
        status: 'Inactivate',
        activation_code: uuidv4(),
        start_date,
      });
    }

    await Enrollment.bulkCreate(enrollments);

    return res.status(201).send(enrollments);
  }
}
