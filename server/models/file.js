import env from '@/common/env';
import cuid from 'cuid';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: env.S3_ACCESS_KEY,
  secretAccessKey: env.S3_SECRET_ACCESS,
  region: env.S3_REGION,
  signatureVersion: 'v4',
});

const BUCKET = env.S3_BUCKET;
const signedUrlExpireSeconds = 60 * 5;

export default (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    mime_type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.TEXT,
    },
    fileable_id: {
      type: DataTypes.INTEGER,
    },
    fileable_type: {
      type: DataTypes.STRING,
    },
    meta: {
      type: DataTypes.JSON,
    },
    uploaded_by_user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: true,
    },
  });

  File.associate = models => {};

  File.generatePresignedUrl = function generatePresignedUrl(name) {
    return s3.getSignedUrl('putObject', {
      Bucket: BUCKET,
      Key: `${name}_${cuid()}`,
      Expires: signedUrlExpireSeconds,
    });
  };

  return File;
};
