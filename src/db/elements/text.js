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
    y = 0,
    max = 100,
    size = 32,
    font = 'sans-serif',
    color = '#000000',
    stroke = 'transparent',
    swidth = 1,
    align = 'start',
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
  const fields = [];
  const values = [];

  const fieldMap = {
    content: 'content',
    x: 'x',
    y: 'y',
    max: 'max',
    size: 'size',
    font: 'font',
    color: 'color',
    stroke: 'stroke',
    swidth: 'swidth',
    align: 'align',
    direction: 'direction',
    blur: 'blur',
    degree: 'degree',
    senior: 'senior',
  };

  Object.keys(fieldMap).forEach(key => {
    if (options[key] !== undefined) {
      fields.push(`${fieldMap[key]} = ?`);
      values.push(options[key]);
    }
  });

  if (fields.length === 0) return;

  values.push(eid);

  const sql = `UPDATE ${TEXT_TABLE} SET ${fields.join(', ')} WHERE eid = :eid;`;
  const params = {};
  const keys = fields.map(f => f.split(' = ')[0]);
  for (let i = 0; i < values.length - 1; i++) {
    params[`:${keys[i].trim()}`] = values[i];
  }
  params[':eid'] = values[values.length - 1];
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
