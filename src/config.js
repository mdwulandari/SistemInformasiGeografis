import Dotenv from "dotenv";

Dotenv.config();

const {
  APP_PORT,
} = process.env;

export default {
  PORT: APP_PORT,
};
