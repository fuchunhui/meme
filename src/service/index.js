import axios from 'axios';
import config from '../config/index.js';

const {server} = config;

const headers = {
  'content-type': 'application/json'
};

const send = (toid, content, type = 'IMAGE') => {
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

  axios({
    url: server,
    method: 'post',
    headers,
    data
  }).then(res => {
    // console.log(res.data);
  }).catch(error => {
    console.error(error);
  });
};

export {
  send
};
