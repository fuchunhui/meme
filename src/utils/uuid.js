/**
 * generate unique IDs
 * @param {string} prefix 前缀
 * @returns uuid
 */
const uuid = (prefix = 'meme') => {
  const id = new Date().getTime();

  return `${prefix}_${id}`;
};

export default uuid;
