import { getDB } from '../manager.js';
import { ELEMENT_TABLE } from '../constant.js';

/**
 * 创建一个新的 Element（元素）
 * @param {String} eid - Element 唯一标识
 * @param {String} storyId - 关联的 Story ID
 * @param {String} type - 元素类型（TEXT, IMAGE, GIF 等）
 * @param {Number} layer - 图层顺序
 * @param {Boolean} visible - 是否可见
 * @param {String} ctx - 数据库上下文
 */
const createElement = (eid, storyId, type, layer = 0, visible = true, ctx) => {
  const sql = `INSERT INTO ${ELEMENT_TABLE} (eid, story_id, type, layer, visible)
    VALUES (?, ?, ?, ?, ?);`;
  getDB(ctx).run(sql, [eid, storyId, type, layer, visible ? 1 : 0]);
};

/**
 * 根据 eid 获取 Element 信息
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} Element 对象
 */
const getElementByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${ELEMENT_TABLE} WHERE eid = ?;`;
  return getDB(ctx).get(sql, [eid]);
};

/**
 * 根据 storyId 获取所有 Element 列表
 * @param {String} storyId - Story ID
 * @param {String} ctx - 数据库上下文
 * @returns {Array} Element 列表，按 layer 排序
 */
const getElementsByStoryId = (storyId, ctx) => {
  const sql = `SELECT * FROM ${ELEMENT_TABLE} WHERE story_id = ? ORDER BY layer ASC;`;
  return getDB(ctx).all(sql, [storyId]);
};

/**
 * 根据 storyId 和类型获取 Element 列表
 * @param {String} storyId - Story ID
 * @param {String} type - 元素类型
 * @param {String} ctx - 数据库上下文
 * @returns {Array} Element 列表
 */
const getElementsByStoryIdAndType = (storyId, type, ctx) => {
  const sql = `SELECT * FROM ${ELEMENT_TABLE} WHERE story_id = ? AND type = ? ORDER BY layer ASC;`;
  return getDB(ctx).all(sql, [storyId, type]);
};

/**
 * 更新 Element 信息
 * @param {String} eid - Element 唯一标识
 * @param {Object} data - 要更新的数据
 * @param {String} ctx - 数据库上下文
 */
const updateElement = (eid, data, ctx) => {
  const fields = [];
  const values = [];
  
  if (data.layer !== undefined) {
    fields.push('layer = ?');
    values.push(data.layer);
  }
  if (data.visible !== undefined) {
    fields.push('visible = ?');
    values.push(data.visible ? 1 : 0);
  }
  if (data.type !== undefined) {
    fields.push('type = ?');
    values.push(data.type);
  }
  
  if (fields.length === 0) return;
  
  values.push(eid);
  
  const sql = `UPDATE ${ELEMENT_TABLE} SET ${fields.join(', ')} WHERE eid = ?;`;
  getDB(ctx).run(sql, values);
};

/**
 * 删除 Element（级联删除相关配置）
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteElement = (eid, ctx) => {
  const sql = `DELETE FROM ${ELEMENT_TABLE} WHERE eid = ?;`;
  getDB(ctx).run(sql, [eid]);
};

/**
 * 删除指定 Story 的所有 Element
 * @param {String} storyId - Story ID
 * @param {String} ctx - 数据库上下文
 */
const deleteElementsByStoryId = (storyId, ctx) => {
  const sql = `DELETE FROM ${ELEMENT_TABLE} WHERE story_id = ?;`;
  getDB(ctx).run(sql, [storyId]);
};

/**
 * 调整 Element 的图层顺序
 * @param {String} eid - Element 唯一标识
 * @param {Number} newLayer - 新的图层顺序
 * @param {String} ctx - 数据库上下文
 */
const reorderElement = (eid, newLayer, ctx) => {
  const sql = `UPDATE ${ELEMENT_TABLE} SET layer = ? WHERE eid = ?;`;
  getDB(ctx).run(sql, [newLayer, eid]);
};

export {
  createElement,
  getElementByEid,
  getElementsByStoryId,
  getElementsByStoryIdAndType,
  updateElement,
  deleteElement,
  deleteElementsByStoryId,
  reorderElement,
};
