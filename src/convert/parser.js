import crypto from 'crypto-js';
import {config} from '../config/index.js';

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

  if (message) {
    const index = message.indexOf(' ');
    if (index !== -1) {
      command = message.slice(0, index);
      const surplus = message.slice(index + 1).trim(); // 除去 command 剩余的部分内容

      // 解析参数，支持引号包裹
      let currentParam = '';
      let inQuotes = false;
      let quoteChar = '';

      for (let i = 0; i < surplus.length; i++) {
        const char = surplus[i];

        // 遇到引号
        if ((char === '"' || char === "'") && !inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar && inQuotes) {
          // 结束引号
          inQuotes = false;
          quoteChar = '';
        } else if (char === ' ' && !inQuotes) {
          // 空格分隔参数（非引号内）
          if (currentParam) {
            params.push(currentParam);
            currentParam = '';
          }
        } else {
          // 累加字符
          currentParam += char;
        }
      }

      // 添加最后一个参数
      if (currentParam) {
        params.push(currentParam);
      }
    } else {
      command = message;
    }
  }

  return {
    fromid,
    toid,
    command,
    params,
    key
  };
};

export {
  parser
};
