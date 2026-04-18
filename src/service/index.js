import axios from 'axios';
import {getConfig} from '../config/index.js';

const headers = {
  'content-type': 'application/json'
};

const normalizeBody = (content, type) => {
  if (!Array.isArray(content)) {
    return [
      {
        content,
        type
      }
    ];
  }

  return content
    .map(item => {
      if (typeof item === 'string') {
        return {
          content: item,
          type
        };
      }

      return {
        content: item.content,
        type: item.type || type,
      };
    })
    .filter(item => item.content);
};

const send = (key, toid, content, type = 'IMAGE') => {
  const data = {
    message: {
      header: {
        toid: [toid]
      },
      body: normalizeBody(content, type)
    }
  };

  const target = getConfig(key);
  if (!target || !target.server) {
    console.error('send target is missing for key:', key);
    return;
  }

  axios({
    url: target.server,
    method: 'post',
    headers,
    data
  }).catch(error => {
    console.error(error);
  });
};

export {
  send
};
