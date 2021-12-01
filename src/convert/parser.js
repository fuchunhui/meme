import crypto from 'crypto-js';
import config from '../config/index.js';
import {matchText} from '../utils/regex.js';

const {enc, mode, pad, AES} = crypto;
const {key} = config;

class AESCipher {
  constructor(key) {
    this.key = enc.Base64.parse(key);
    this.options = {
      mode: mode.ECB,
      padding: pad.Pkcs7
    };
  }

  encrypt(data) {
    const cipher = AES.encrypt(data, this.key, this.options);
    const base64Cipher = cipher.ciphertext.toString(enc.Base64);
    const result = base64Cipher
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
    return result;
  }

  decrypt(data) {
    const content = data
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(data.length + data.length % 4, '=');
    const bytes = AES.decrypt(content, this.key, this.options);
    return bytes.toString(enc.Utf8);
  }
}

const _decode = encryption => {
  const cipher = new AESCipher(key);
  const data = cipher.decrypt(encryption);
  return JSON.parse(data);
};

const parser = encryption => {
  const content = _decode(encryption);
  const {header, body} = content.message;
  const {fromuserid: fromid, toid} = header;
  const cell = body.find(({type, content}) => type === 'TEXT' && content.trim());
  let message = cell ? cell.content.trim() : '';

  let command = '';
  let params = [];
  let text = '';

  if (message) {
    const quotationText = matchText(message);
    if (quotationText) {
      message = message.replace(quotationText, '').trim();
    }

    const info = message.split(' ');
    command = info.shift();
    if (quotationText) {
      text = quotationText.slice(1, quotationText.length - 1);
    } else {
      text = info.pop() || '';
    }
    params = info;
  }

  return {
    fromid,
    toid,
    command,
    text,
    params
  };
};

export {
  parser
};
