import config from '../../.draft/config.js';

const env = process.env.NODE_ENV;

if (env === 'test') {
  process.env.MEME_BASE_URL = 'http://localhost:8080';
}

const {server, token, key} = config;

export default {
  server,
  token,
  key,
  extension: {}
};
