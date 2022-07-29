import axios from 'axios';
import {getConfig} from '../config/index.js';

const headers = {
  'content-type': 'application/json'
};

const send = (key, toid, content, type = 'IMAGE') => {
  const data = {
    message: {
      header: {
        toid: [toid]
      },
      body: [
        {
          content,
          type
        }
      ]
    }
  };

  const url = getConfig(key).server;
  axios({
    url,
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
