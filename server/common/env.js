import dotenv from 'dotenv';

export default {
  ...dotenv.config().parsed,
  CLIENT_APP_URL: process.env.CLIENT_APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
};
