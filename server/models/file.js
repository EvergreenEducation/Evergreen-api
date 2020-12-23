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
const signedUrlExpireSeconds = 60 * 5 * 360;

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
    user_role:{
      type: DataTypes.STRING
    },
    pdf_link: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    uploaded_by_user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: true,
    },
    file_link: {
      type: DataTypes.VIRTUAL,
      get: function () {
         return File.getUrl(this.getDataValue('location'));
       },
    },
  });

  File.associate = models => {
    File.belongsTo(models.Provider, { foreignKey: 'fileable_id', constraints: false });
  };

  File.generatePresignedUrl = function generatePresignedUrl(name) {
    return s3.getSignedUrl('putObject', {
      Bucket: BUCKET,
      Key: `${name}`,
      Expires: signedUrlExpireSeconds,
    });
  };

  File.getUrl = function getUrl(location) {
    return s3.getSignedUrl('getObject', {
      Bucket: BUCKET,
      Key: `${location}`,
      Expires: 86400,
    });
  };

  return File;
};
