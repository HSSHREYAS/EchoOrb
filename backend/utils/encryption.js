const CryptoJS = require('crypto-js');

/**
 * Encrypts text using AES encryption
 * @param {string} text - The text to encrypt
 * @returns {string} - Encrypted string
 */
const encryptText = (text) => {
  if (!text) return '';
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY is not defined in environment variables');
  }
  return CryptoJS.AES.encrypt(text, encryptionKey).toString();
};

/**
 * Decrypts encrypted text using AES decryption
 * @param {string} encryptedText - The encrypted text to decrypt
 * @returns {string} - Decrypted string
 */
const decryptText = (encryptedText) => {
  if (!encryptedText) return '';
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY is not defined in environment variables');
  }
  const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptText,
  decryptText
};