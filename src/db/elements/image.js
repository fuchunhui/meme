import { run, get, all } from '../query.js';
import { IMAGE_TABLE, IMAGE_TYPE } from '../constant.js';

/**
 * 创建图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 图片配置选项
 * @param {String} ctx - 数据库上下文
 */
const createImage = (eid, options, ctx) => {
  const {
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    ipath = IMAGE_TYPE.SVG,
  } = options;

  const sql = `INSERT INTO ${IMAGE_TABLE} (eid, x, y, width, height, ipath)
    VALUES (:eid, :x, :y, :width, :height, :ipath);`;

  run(sql, { ':eid': eid, ':x': x, ':y': y, ':width': width, ':height': height, ':ipath': ipath }, ctx);
};

/**
 * 根据 eid 获取图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} 图片配置对象
 */
const getImageByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${IMAGE_TABLE} WHERE eid = :eid;`;
  return get(sql, { ':eid': eid }, ctx);
};

/**
 * 更新图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 要更新的配置
 * @param {String} ctx - 数据库上下文
 */
const updateImage = (eid, options, ctx) => {
  const sets = [];
  const params = { ':eid': eid };

  if (options.x !== undefined) {
    sets.push('x = :x');
    params[':x'] = options.x;
  }
  if (options.y !== undefined) {
    sets.push('y = :y');
    params[':y'] = options.y;
  }
  if (options.width !== undefined) {
    sets.push('width = :width');
    params[':width'] = options.width;
  }
  if (options.height !== undefined) {
    sets.push('height = :height');
    params[':height'] = options.height;
  }
  if (options.ipath !== undefined) {
    sets.push('ipath = :ipath');
    params[':ipath'] = options.ipath;
  }

  if (sets.length === 0) return;

  const sql = `UPDATE ${IMAGE_TABLE} SET ${sets.join(', ')} WHERE eid = :eid;`;
  run(sql, params, ctx);
};

/**
 * 删除图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteImage = (eid, ctx) => {
  const sql = `DELETE FROM ${IMAGE_TABLE} WHERE eid = :eid;`;
  run(sql, { ':eid': eid }, ctx);
};

/**
 * 批量获取图片元素配置
 * @param {Array} eids - Element ID 数组
 * @param {String} ctx - 数据库上下文
 * @returns {Array} 图片配置数组
 */
const getImagesByEids = (eids, ctx) => {
  if (!eids || eids.length === 0) return [];
  
  const placeholders = eids.map(() => '?').join(',');
  const sql = `SELECT * FROM ${IMAGE_TABLE} WHERE eid IN (${placeholders});`;
  return all(sql, eids, ctx);
};

export {
  createImage,
  getImageByEid,
  updateImage,
  deleteImage,
  getImagesByEids,
};
