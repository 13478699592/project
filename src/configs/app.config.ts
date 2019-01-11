import * as _ from "lodash";

const {
  env: {
    DATABASE_HOST,
    DATABASE_INSTANCE,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
    PASSWORD_CONFIG_ENV,
    PASSWORD_CONFIG_IV,
  },
} = process;

export const APP_CONFIG = {
  DATABASE_HOST: _.toString(DATABASE_HOST),
  DATABASE_INSTANCE: _.toString(DATABASE_INSTANCE),
  DATABASE_NAME: _.toString(DATABASE_NAME),
  DATABASE_PASSWORD: _.toString(DATABASE_PASSWORD),
  DATABASE_PORT: _.toNumber(DATABASE_PORT),
  DATABASE_USERNAME: _.toString(DATABASE_USERNAME),
  PASSWORD_CONFIG_ENV: _.toString(PASSWORD_CONFIG_ENV),
  PASSWORD_CONFIG_IV: _.toString(PASSWORD_CONFIG_IV)
};
