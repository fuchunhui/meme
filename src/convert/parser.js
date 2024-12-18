import crypto from 'crypto-js';
import {config} from '../config/index.js';
import {matchText} from '../utils/regex.js';

const {enc, mode, pad, AES} = crypto;

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

// const _decode = encryption => {
//   const cipher = new AESCipher(key);
//   const data = cipher.decrypt(encryption);
//   return JSON.parse(data);
// };

const _decodes = encryption => {
  let info = null;

  for (const {key} of config) {
    const cipher = new AESCipher(key);
    let data = null;

    try {
      data = cipher.decrypt(encryption);
    } catch (error) {
      // console.error(error); 注释掉，否则解码会报错
    }

    if (data) {
      info = {
        ...JSON.parse(data),
        key
      };
      break;
    }
  }
  
  return info;
};

const parser = encryption => {
  const {message: {header, body}, key} = _decodes(encryption);
  const {fromuserid: fromid, toid} = header;
  const cell = body.find(({type, content}) => type === 'TEXT' && content.trim());
  let message = cell ? cell.content.trim() : '';

  let command = '';
  let params = [];
  let param = '';
  let text = '';

  if (message) {
    let surplus = '';
    const index = message.indexOf(' ');
    if (index !== -1) {
      command = message.slice(0, index);
      surplus = message.slice(index + 1); // 除去 command 剩余的部分内容

      const quotationText = matchText(surplus);
      if (quotationText) { // 判断末尾的文字，是不是带有引号
        text = quotationText.slice(1, quotationText.length - 1);
        if (surplus.length > quotationText.length) { // 检测，除去文本后，是否还有参数
          const tIndex = surplus.lastIndexOf(quotationText);
          param = surplus.slice(0, tIndex).trim();
        }
      } else {
        const lastIndex = surplus.lastIndexOf(' '); // 查找空格，从后面获取 text 内容，文本后置是保证，命令和参数的紧密结合，像函数调用一样
        if (lastIndex !== -1) {
          text = surplus.slice(lastIndex + 1);
          param = surplus.slice(0, lastIndex);
        } else {
          text = surplus;
        }
      }
    } else {
      command = message;
    }

    if (param) {
      params = [param];
    }
  }

  return {
    fromid,
    toid,
    command,
    text,
    params,
    key
  };
};

export {
  parser
};
