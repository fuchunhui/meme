import uuid from './uuid.js';

const getMid = mid => {
  return mid && /^meme_/g.test(mid) ? mid : uuid();
};

export {
  getMid
};