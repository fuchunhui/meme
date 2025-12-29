import { getDB } from '../manager.js';
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
    VALUES (?, ?, ?, ?, ?, ?);`;

  getDB(ctx).run(sql, [eid, x, y, width, height, ipath]);
};

/**
 * 根据 eid 获取图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} 图片配置对象
 */
const getImageByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${IMAGE_TABLE} WHERE eid = ?;`;
  return getDB(ctx).get(sql, [eid]);
};

/**
 * 更新图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 要更新的配置
 * @param {String} ctx - 数据库上下文
 */
const updateImage = (eid, options, ctx) => {
  const fields = [];
  const values = [];

  const fieldMap = {
    x: 'x',
    y: 'y',
    width: 'width',
    height: 'height',
    ipath: 'ipath',
  };

  Object.keys(fieldMap).forEach(key => {
    if (options[key] !== undefined) {
      fields.push(`${fieldMap[key]} = ?`);
      values.push(options[key]);
    }
  });

  if (fields.length === 0) return;

  values.push(eid);

  const sql = `UPDATE ${IMAGE_TABLE} SET ${fields.join(', ')} WHERE eid = ?;`;
  getDB(ctx).run(sql, values);
};

/**
 * 删除图片元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteImage = (eid, ctx) => {
  const sql = `DELETE FROM ${IMAGE_TABLE} WHERE eid = ?;`;
  getDB(ctx).run(sql, [eid]);
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
  return getDB(ctx).all(sql, eids);
};

export {
  createImage,
  getImageByEid,
  updateImage,
  deleteImage,
  getImagesByEids,
};
