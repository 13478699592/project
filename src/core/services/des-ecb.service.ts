import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { DESECB_CONFIG } from '../../configs/desecb.config';

@Injectable()
export class DesEcbService {
    decryptedDES(des_password,currentTime) {
        var key = CryptoJS.enc.Utf8.parse(currentTime.toString()+'000');
        var enc_password = CryptoJS.enc.Hex.parse(des_password);
        var password = CryptoJS.enc.Base64.stringify(enc_password);
        var decrypt = CryptoJS.AES.decrypt(password, key, DESECB_CONFIG);
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    encryptedDES(password,currentTime) {
        const key = CryptoJS.enc.Utf8.parse(currentTime.toString()+'000'); //16位
        let encrypted:any;
        var enc_password = CryptoJS.enc.Utf8.parse(password);
        encrypted = CryptoJS.AES.encrypt(enc_password, key, DESECB_CONFIG);
        return encrypted.ciphertext.toString();
    }
}
