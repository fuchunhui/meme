const env = process.env.NODE_ENV;

if (env === 'test') {
  process.env.MEME_BASE_URL = 'http://localhost:8080';
}
