import CryptoJS from 'crypto-js';
import environment from '@/environment';

export const crypto = {
  encryptionSimpleAES: (plainText: string | number) => {
    if (!plainText) {
      throw new Error('plainText is require');
    }
    const b64 = CryptoJS.AES.encrypt(JSON.stringify(plainText), environment.cryptoKey).toString();
    const e64 = CryptoJS.enc.Base64.parse(b64);
    const eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  },
  decryptSimpleAES: (cipherText: string) => {
    if (!cipherText) {
      throw new Error('cipherText is require');
    }

    const reb64 = CryptoJS.enc.Hex.parse(cipherText);
    const bytes = reb64.toString(CryptoJS.enc.Base64);
    const decrypt = CryptoJS.AES.decrypt(bytes, environment.cryptoKey);
    const plain = decrypt.toString(CryptoJS.enc.Utf8);
    if (!plain) {
      return null;
    }
    return plain;
  },
  encryptAESWithIV: (plainText: string | number) => {
    if (!plainText) {
      throw new Error('Data is required for encryption.');
    }

    const key = CryptoJS.enc.Utf8.parse(environment.cryptoKey.padEnd(32, '0').slice(0, 32)); // 32바이트 키
    const iv = CryptoJS.lib.WordArray.random(16); // 16바이트 IV

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(plainText), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // IV와 암호화된 데이터 모두 반환
    return JSON.stringify({
      iv: iv.toString(CryptoJS.enc.Base64),
      data: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    });
  },

  decryptionAESWithIV: (cipherTextJson: string) => {
    if (!cipherTextJson) {
      throw new Error('Cipher text is required for decryption.');
    }

    const { iv, data } = JSON.parse(cipherTextJson);

    const key = CryptoJS.enc.Utf8.parse(environment.cryptoKey.padEnd(32, '0').slice(0, 32));
    const encryptedCP = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(data),
    });

    const decrypted = CryptoJS.AES.decrypt(encryptedCP, key, {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  },
};
