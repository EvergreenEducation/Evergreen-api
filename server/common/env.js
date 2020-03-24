import dotenv from 'dotenv';

export default {
  ...dotenv.config().parsed,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
};
