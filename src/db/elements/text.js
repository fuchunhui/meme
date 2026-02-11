import { run, get, all } from '../query.js';
import { TEXT_TABLE } from '../constant.js';

/**
 * 创建文本元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 文本配置选项
 * @param {String} ctx - 数据库上下文
 */
const createText = (eid, options, ctx) => {
  const {
    content = '',
    x = 0,
    y = 30, // size - 2
    max = 100,
    size = 32,
    font = 'sans-serif',
    color = '#000000',
    stroke = 'transparent',
    swidth = 1,
    align = 'center',
    direction = 'down',
    blur = 0,
    degree = 0,
    senior = 1,
  } = options;

  const sql = `INSERT INTO ${TEXT_TABLE}
    (eid, content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree, senior)
    VALUES (:eid, :content, :x, :y, :max, :size, :font, :color, :stroke, :swidth, :align, :direction, :blur, :degree, :senior);`;

  run(sql, {
    ':eid': eid,
    ':content': content,
    ':x': x,
    ':y': y,
    ':max': max,
    ':size': size,
    ':font': font,
    ':color': color,
    ':stroke': stroke,
    ':swidth': swidth,
    ':align': align,
    ':direction': direction,
    ':blur': blur,
    ':degree': degree,
    ':senior': senior,
  }, ctx);
};

/**
 * 根据 eid 获取文本元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} 文本配置对象
 */
const getTextByEid = (eid, ctx) => {
  const sql = `SELECT * FROM ${TEXT_TABLE} WHERE eid = :eid;`;
  return get(sql, { ':eid': eid }, ctx);
};

/**
 * 更新文本元素配置
 * @param {String} eid - Element 唯一标识
 * @param {Object} options - 要更新的配置
 * @param {String} ctx - 数据库上下文
 */
const updateText = (eid, options, ctx) => {
  const sets = [];
  const params = { ':eid': eid };

  if (options.content !== undefined) { sets.push('content = :content'); params[':content'] = options.content; }
  if (options.x !== undefined) { sets.push('x = :x'); params[':x'] = options.x; }
  if (options.y !== undefined) { sets.push('y = :y'); params[':y'] = options.y; }
  if (options.max !== undefined) { sets.push('max = :max'); params[':max'] = options.max; }
  if (options.size !== undefined) { sets.push('size = :size'); params[':size'] = options.size; }
  if (options.font !== undefined) { sets.push('font = :font'); params[':font'] = options.font; }
  if (options.color !== undefined) { sets.push('color = :color'); params[':color'] = options.color; }
  if (options.stroke !== undefined) { sets.push('stroke = :stroke'); params[':stroke'] = options.stroke; }
  if (options.swidth !== undefined) { sets.push('swidth = :swidth'); params[':swidth'] = options.swidth; }
  if (options.align !== undefined) { sets.push('align = :align'); params[':align'] = options.align; }
  if (options.direction !== undefined) { sets.push('direction = :direction'); params[':direction'] = options.direction; }
  if (options.blur !== undefined) { sets.push('blur = :blur'); params[':blur'] = options.blur; }
  if (options.degree !== undefined) { sets.push('degree = :degree'); params[':degree'] = options.degree; }
  if (options.senior !== undefined) { sets.push('senior = :senior'); params[':senior'] = options.senior; }

  if (sets.length === 0) return;

  const sql = `UPDATE ${TEXT_TABLE} SET ${sets.join(', ')} WHERE eid = :eid;`;
  run(sql, params, ctx);
};

/**
 * 删除文本元素配置
 * @param {String} eid - Element 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteText = (eid, ctx) => {
  const sql = `DELETE FROM ${TEXT_TABLE} WHERE eid = :eid;`;
  run(sql, { ':eid': eid }, ctx);
};

/**
 * 批量获取文本元素配置
 * @param {Array} eids - Element ID 数组
 * @param {String} ctx - 数据库上下文
 * @returns {Array} 文本配置数组
 */
const getTextsByEids = (eids, ctx) => {
  if (!eids || eids.length === 0) return [];
  
  const placeholders = eids.map(() => '?').join(',');
  const sql = `SELECT * FROM ${TEXT_TABLE} WHERE eid IN (${placeholders});`;
  return all(sql, eids, ctx);
};

export {
  createText,
  getTextByEid,
  updateText,
  deleteText,
  getTextsByEids,
};
