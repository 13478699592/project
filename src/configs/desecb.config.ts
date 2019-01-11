import { APP_CONFIG } from "./app.config";
import * as CryptoJS from 'crypto-js';

const {
    PASSWORD_CONFIG_ENV,
    PASSWORD_CONFIG_IV,
} = APP_CONFIG;

export const DESECB_CONFIG:any = {
  env:CryptoJS.enc.Utf8.parse(PASSWORD_CONFIG_ENV),
  iv: CryptoJS.enc.Utf8.parse(PASSWORD_CONFIG_IV),
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
};
