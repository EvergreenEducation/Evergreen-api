import dotenv from 'dotenv';

export default {
  ...dotenv.config().parsed,
  CLIENT_APP_URL: process.env.CLIENT_APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_ACCESS: process.env.S3_SECRET_ACCESS,
};
