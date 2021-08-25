import axios from 'axios';
import config from '../config/index.js';

const {server} = config;

const headers = {
  'content-type': 'application/json'
};

const send = (base64Img, toid) => {
  const data = {
    message: {
      header: {
        toid: [toid]
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
