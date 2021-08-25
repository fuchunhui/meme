/**
 * generate unique IDs
 * @param {string} prefix 前缀
 * @returns uuid
 */

const counter = {};

const uuid = (prefix = 'meme') => {
  if (!counter[prefix]) {
    counter[prefix] = new Date().getTime();
  }
  const id = counter[prefix]++;

  return `${prefix}_${id}`;
};

export default uuid;
