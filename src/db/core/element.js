import { run, get, all } from '../query.js';
import { ELEMENT_TABLE } from '../constant.js';

/**
 * 创建一个新的 Element（元素）
 * @param {String} eid - Element 唯一标识
 * @param {String} mid - 关联的 Story ID
 * @param {String} type - 元素类型（TEXT, IMAGE）
 * @param {Number} layer - 图层顺序
 * @param {Boolean} visible - 是否可见
 * @param {String} ctx - 数据库上下文
 */
const createElement = (eid, mid, type, layer = 1, visible = true, ctx) => {
  const sql = `INSERT INTO ${ELEMENT_TABLE} (eid, mid, type, layer, visible)
    VALUES (:eid, :mid, :type, :layer, :visible);`;
  run(sql, { ':eid': eid, ':mid': mid, ':type': type, ':layer': layer, ':visible': visible ? 1 : 0 }, ctx);
};

/**
 * 根据 eid 获取 Element 信息
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} Element 对象
 */
const getElementByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${ELEMENT_TABLE} WHERE eid = :eid;`;
  return get(sql, { ':eid': eid }, ctx);
};

/**
 * 根据 mid 获取所有 Element 列表
 * @param {String} mid - Story ID
 * @param {String} ctx - 数据库上下文
 * @returns {Array} Element 列表，按 layer 排序
 */
const getElementsByStoryId = (mid, ctx) => {
  const sql = `SELECT * FROM ${ELEMENT_TABLE} WHERE mid = :mid ORDER BY layer ASC;`;
  return all(sql, { ':mid': mid }, ctx);
};

/**
 * 根据 mid 和类型获取 Element 列表
 * @param {String} mid - Story ID
 * @param {String} type - 元素类型
 * @param {String} ctx - 数据库上下文
 * @returns {Array} Element 列表
 */
const getElementsByStoryIdAndType = (mid, type, ctx) => {
  const sql = `SELECT * FROM ${ELEMENT_TABLE} WHERE mid = :mid AND type = :type ORDER BY layer ASC;`;
  return all(sql, { ':mid': mid, ':type': type }, ctx);
};

/**
 * 更新 Element 信息
 * @param {String} eid - Element 唯一标识
 * @param {Object} data - 要更新的数据
 * @param {String} ctx - 数据库上下文
 */
const updateElement = (eid, data, ctx) => {
  const sets = [];
  const params = { ':eid': eid };

  if (data.layer !== undefined) {
    sets.push('layer = :layer');
    params[':layer'] = data.layer;
  }
  if (data.visible !== undefined) {
    sets.push('visible = :visible');
    params[':visible'] = data.visible ? 1 : 0;
  }
  if (data.type !== undefined) {
    sets.push('type = :type');
    params[':type'] = data.type;
  }

  if (sets.length === 0) return;

  const sql = `UPDATE ${ELEMENT_TABLE} SET ${sets.join(', ')} WHERE eid = :eid;`;
  run(sql, params, ctx);
};

/**
 * 删除 Element（级联删除相关配置）
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteElement = (eid, ctx) => {
  const sql = `DELETE FROM ${ELEMENT_TABLE} WHERE eid = :eid;`;
  run(sql, { ':eid': eid }, ctx);
};

/**
 * 删除指定 Story 的所有 Element
 * @param {String} mid - Story ID
 * @param {String} ctx - 数据库上下文
 */
const deleteElementsByStoryId = (mid, ctx) => {
  const sql = `DELETE FROM ${ELEMENT_TABLE} WHERE mid = :mid;`;
  run(sql, { ':mid': mid }, ctx);
};

/**
 * 调整 Element 的图层顺序
 * @param {String} eid - Element 唯一标识
 * @param {Number} newLayer - 新的图层顺序
 * @param {String} ctx - 数据库上下文
 */
const reorderElement = (eid, newLayer, ctx) => {
  const sql = `UPDATE ${ELEMENT_TABLE} SET layer = :layer WHERE eid = :eid;`;
  run(sql, { ':layer': newLayer, ':eid': eid }, ctx);
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
