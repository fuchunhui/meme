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
  const fields = [];
  const values = [];
  
  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }
  if (data.md5 !== undefined) {
    fields.push('md5 = ?');
    values.push(data.md5);
  }
  if (data.feature !== undefined) {
    fields.push('feature = ?');
    values.push(data.feature);
  }
  if (data.type !== undefined) {
    fields.push('type = ?');
    values.push(data.type);
  }
  
  if (fields.length === 0) return;
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(mid);
  
  const sql = `UPDATE ${STORY_TABLE} SET ${fields.join(', ')} WHERE mid = :mid;`;
  // values currently contains fields values then mid
  const params = {};
  const keys = fields.map(f => f.split(' = ')[0]);
  // map positional values to params
  for (let i = 0; i < values.length - 1; i++) {
    params[`:${keys[i].trim()}`] = values[i];
  }
  params[':mid'] = values[values.length - 1];
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
