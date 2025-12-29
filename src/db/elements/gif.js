import { run, get, all } from '../query.js';
import { GIF_TABLE } from '../constant.js';

/**
 * 创建动图元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 动图配置选项
 * @param {String} ctx - 数据库上下文
 */
const createGif = (eid, options, ctx) => {
  const {
    frame = 'NORMAL',
  } = options;

  const sql = `INSERT INTO ${GIF_TABLE} (eid, frame)
    VALUES (:eid, :frame);`;

  run(sql, { ':eid': eid, ':frame': frame }, ctx);
};

/**
 * 根据 eid 获取动图元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} 动图配置对象
 */
const getGifByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${GIF_TABLE} WHERE eid = :eid;`;
  return get(sql, { ':eid': eid }, ctx);
};

/**
 * 更新动图元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 要更新的配置
 * @param {String} ctx - 数据库上下文
 */
const updateGif = (eid, options, ctx) => {
  const fields = [];
  const values = [];

  if (options.frame !== undefined) {
    fields.push('frame = ?');
    values.push(options.frame);
  }

  if (fields.length === 0) return;

  values.push(eid);

  const sql = `UPDATE ${GIF_TABLE} SET ${fields.join(', ')} WHERE eid = :eid;`;
  const params = {};
  const keys = fields.map(f => f.split(' = ')[0]);
  for (let i = 0; i < values.length - 1; i++) {
    params[`:${keys[i].trim()}`] = values[i];
  }
  params[':eid'] = values[values.length - 1];
  run(sql, params, ctx);
};

/**
 * 删除动图元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteGif = (eid, ctx) => {
  const sql = `DELETE FROM ${GIF_TABLE} WHERE eid = :eid;`;
  run(sql, { ':eid': eid }, ctx);
};

/**
 * 批量获取动图元素配置
 * @param {Array} eids - Element ID 数组
 * @param {String} ctx - 数据库上下文
 * @returns {Array} 动图配置数组
 */
const getGifsByEids = (eids, ctx) => {
  if (!eids || eids.length === 0) return [];
  
  const placeholders = eids.map(() => '?').join(',');
  const sql = `SELECT * FROM ${GIF_TABLE} WHERE eid IN (${placeholders});`;
  return all(sql, eids, ctx);
};

export {
  createGif,
  getGifByEid,
  updateGif,
  deleteGif,
  getGifsByEids,
};
