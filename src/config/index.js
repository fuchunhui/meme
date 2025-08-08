import config from '../../.draft/config.js';

const env = process.env.NODE_ENV;

if (env === 'test') {
  process.env.MEME_BASE_URL = 'http://localhost:8080';
}

const getConfig = key => {
  return config.find(item => item.key === key);
};

export {
  config,
  getConfig
};
