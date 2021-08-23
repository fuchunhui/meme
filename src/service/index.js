import axios from 'axios';
import config from '../config/index.js';

const {server, traget} = config;

const headers = {
  'content-type': 'application/json'
};

const send = base64Img => {
  const data = {
    message: {
      header: {
        toid: [traget]
      },
      body: [
        {
          content: base64Img,
          type: 'IMAGE'
        }
      ]
    }
  };
  // console.log(JSON.stringify(data));
  axios({
    url: server,
    method: 'post',
    headers,
    data
  }).then(res => {
    console.log(res.data);
  }).catch(error => {
    console.error(error);
  });
};

export {
  send
};
