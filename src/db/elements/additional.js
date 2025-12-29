import { getDB } from '../manager.js';
import { ADDITIONAL_TABLE } from '../constant.js';

/**
 * 创建附加信息元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 附加信息配置选项
 * @param {String} ctx - 数据库上下文
 */
const createAdditional = (eid, options, ctx) => {
  const {
    text = '',
  } = options;

  const sql = `INSERT INTO ${ADDITIONAL_TABLE} (eid, text)
    VALUES (?, ?);`;

  getDB(ctx).run(sql, [eid, text]);
};

/**
 * 根据 eid 获取附加信息元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} 附加信息配置对象
 */
const getAdditionalByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${ADDITIONAL_TABLE} WHERE eid = ?;`;
  return getDB(ctx).get(sql, [eid]);
};

/**
 * 更新附加信息元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 要更新的配置
 * @param {String} ctx - 数据库上下文
 */
const updateAdditional = (eid, options, ctx) => {
  const fields = [];
  const values = [];

  if (options.text !== undefined) {
    fields.push('text = ?');
    values.push(options.text);
  }

  if (fields.length === 0) return;

  values.push(eid);

  const sql = `UPDATE ${ADDITIONAL_TABLE} SET ${fields.join(', ')} WHERE eid = ?;`;
  getDB(ctx).run(sql, values);
};

/**
 * 删除附加信息元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteAdditional = (eid, ctx) => {
  const sql = `DELETE FROM ${ADDITIONAL_TABLE} WHERE eid = ?;`;
  getDB(ctx).run(sql, [eid]);
};

/**
 * 批量获取附加信息元素配置
 * @param {Array} eids - Element ID 数组
 * @param {String} ctx - 数据库上下文
 * @returns {Array} 附加信息配置数组
 */
const getAdditionalsByEids = (eids, ctx) => {
  if (!eids || eids.length === 0) return [];
  
  const placeholders = eids.map(() => '?').join(',');
  const sql = `SELECT * FROM ${ADDITIONAL_TABLE} WHERE eid IN (${placeholders});`;
  return getDB(ctx).all(sql, eids);
};

export {
  createAdditional,
  getAdditionalByEid,
  updateAdditional,
  deleteAdditional,
  getAdditionalsByEids,
};
