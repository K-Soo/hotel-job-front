import CryptoJS from 'crypto-js';
import environment from '@/environment';

export const crypto = {
  encryptionAES: (plainText: string | number) => {
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

  // decryptionAES: (cipherText: string) => {
  //   if (!cipherText) {
  //     throw new Error('Cipher text is required for decryption.');
  //   }

  //   const key = CryptoJS.enc.Utf8.parse(environment.cryptoKey.padEnd(32, '0').slice(0, 32));
  //   const { iv, data } = JSON.parse(cipherText);

  //   const decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(data) }, key, {
  //     iv: CryptoJS.enc.Base64.parse(iv),
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });

  //   return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  // },
};
