import dotenv from 'dotenv';

const config = {
  ...dotenv.config().parsed,
  CLIENT_APP_URL: process.env.CLIENT_APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,

  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
  AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,

  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_ACCESS: process.env.S3_SECRET_ACCESS,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
};

export default config;
