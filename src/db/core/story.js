import { run, get, all } from '../query.js';
import { STORY_TABLE, STORY_TYPE } from '../constant.js';

/**
 * 创建一个新的 Story（表情包）
 * @param {String} mid - Story 唯一标识
 * @param {String} name - Story 名称
 * @param {String} md5 - 内容摘要
 * @param {String} feature - 特性描述
 * @param {String} ctx - 数据库上下文
 */
const createStory = (mid, name, md5, feature = '', type = STORY_TYPE.TEXT, ctx) => {
  const sql = `INSERT INTO ${STORY_TABLE} (mid, name, md5, feature, type)
    VALUES (:mid, :name, :md5, :feature, :type);`;
  run(sql, { ':mid': mid, ':name': name, ':md5': md5, ':feature': feature, ':type': type }, ctx);
};

/**
 * 根据 mid 获取 Story 信息
 * @param {String} mid - Story 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} Story 对象
 */
const getStoryByMid = (mid, ctx) => {
  const sql = `SELECT * FROM ${STORY_TABLE} WHERE mid = :mid;`;
  return get(sql, { ':mid': mid }, ctx);
};

/**
 * 根据名称获取 Story 信息
 * @param {String} name - Story 名称
 * @param {String} ctx - 数据库上下文
 * @returns {Object} Story 对象
 */
const getStoryByName = (name, ctx) => {
  const sql = `SELECT * FROM ${STORY_TABLE} WHERE name = :name COLLATE NOCASE;`;
  return get(sql, { ':name': name }, ctx);
};

/**
 * 获取所有 Story 列表
 * @param {String} ctx - 数据库上下文
 * @returns {Array} Story 列表
 */
const getAllStories = ctx => {
  const sql = `SELECT * FROM ${STORY_TABLE} ORDER BY updated_at DESC;`;
  return all(sql, {}, ctx);
};

/**
 * 更新 Story 信息
 * @param {String} mid - Story 唯一标识
 * @param {Object} data - 要更新的数据
 * @param {String} ctx - 数据库上下文
 */
const updateStory = (mid, data, ctx) => {
  const sets = [];
  const params = { ':mid': mid };

  if (data.name !== undefined) {
    sets.push('name = :name');
    params[':name'] = data.name;
  }
  if (data.md5 !== undefined) {
    sets.push('md5 = :md5');
    params[':md5'] = data.md5;
  }
  if (data.feature !== undefined) {
    sets.push('feature = :feature');
    params[':feature'] = data.feature;
  }
  if (data.type !== undefined) {
    sets.push('type = :type');
    params[':type'] = data.type;
  }

  if (sets.length === 0) {
    return;
  }

  sets.push('updated_at = CURRENT_TIMESTAMP');
  const sql = `UPDATE ${STORY_TABLE} SET ${sets.join(', ')} WHERE mid = :mid;`;
  run(sql, params, ctx);
};

/**
 * 删除 Story（级联删除相关元素）
 * @param {String} mid - Story 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteStory = (mid, ctx) => {
  const sql = `DELETE FROM ${STORY_TABLE} WHERE mid = :mid;`;
  run(sql, { ':mid': mid }, ctx);
};

export {
  createStory,
  getStoryByMid,
  getStoryByName,
  getAllStories,
  updateStory,
  deleteStory,
};
