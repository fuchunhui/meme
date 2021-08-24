import config from '../../.draft/config.js';

const env = process.env.NODE_ENV;

if (env === 'test') {
  process.env.MEME_BASE_URL = 'http://localhost:8080';
}

const {server, traget, key} = config; // TODO 更新替换

export default {
  server,
  traget,
  key
};
