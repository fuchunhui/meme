import uuid from './uuid.js';

const getMid = mid => {
  return mid && /^meme_/g.test(mid) ? mid : uuid();
};

const getEid = () => uuid('eid');

export {
  getMid,
  getEid
};