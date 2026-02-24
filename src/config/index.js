import config from '../../.draft/config.js';

/**
 * 获取机器人配置
 * @param {string} key - 机器人的唯一标识 key
 * @returns {Object|undefined} 机器人配置对象
 */
const getConfig = key => {
  return config.find(item => item.key === key);
};

export {
  config,
  getConfig
};
