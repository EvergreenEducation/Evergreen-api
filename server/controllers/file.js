import { File } from '@/models';

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
