import { run, get, all } from '../query.js';
import { GIF_TABLE } from '../constant.js';

/**
 * 创建动图元素配置
 * @param {String} mid - Story 唯一标识
 * @param {Object} options - 动图配置选项
 * @param {String} ctx - 数据库上下文
 */
const createGif = (mid, options, ctx) => {
  const {
    frame = 'NORMAL',
  } = options;

  const sql = `INSERT INTO ${GIF_TABLE} (mid, frame)
    VALUES (:mid, :frame);`;

  run(sql, { ':mid': mid, ':frame': frame }, ctx);
};

/**
 * 根据 mid 获取动图元素配置
 * @param {String} mid - Story 唯一标识
 * @param {String} ctx - 数据库上下文
 * @returns {Object} 动图配置对象
 */
const getGifByMid = (mid, ctx) => {
  const sql = `SELECT * FROM ${GIF_TABLE} WHERE mid = :mid;`;
  return get(sql, { ':mid': mid }, ctx);
};

/**
 * 更新动图元素配置
 * @param {String} mid - Story 唯一标识
 * @param {Object} options - 要更新的配置
 * @param {String} ctx - 数据库上下文
 */
const updateGif = (mid, options, ctx) => {
  const sets = [];
  const params = { ':mid': mid };

  if (options.frame !== undefined) {
    sets.push('frame = :frame');
    params[':frame'] = options.frame;
  }

  if (sets.length === 0) return;

  const sql = `UPDATE ${GIF_TABLE} SET ${sets.join(', ')} WHERE mid = :mid;`;
  run(sql, params, ctx);
};

/**
 * 删除动图元素配置
 * @param {String} mid - Story 唯一标识
 * @param {String} ctx - 数据库上下文
 */
const deleteGif = (mid, ctx) => {
  const sql = `DELETE FROM ${GIF_TABLE} WHERE mid = :mid;`;
  run(sql, { ':mid': mid }, ctx);
};

/**
 * 批量获取动图元素配置
 * @param {Array} mids - Story ID 数组
 * @param {String} ctx - 数据库上下文
 * @returns {Array} 动图配置数组
 */
const getGifsByMids = (mids, ctx) => {
  if (!mids || mids.length === 0) return [];
  
  const placeholders = mids.map(() => '?').join(',');
  const sql = `SELECT * FROM ${GIF_TABLE} WHERE mid IN (${placeholders});`;
  return all(sql, mids, ctx);
};

export {
  createGif,
  getGifByMid,
  updateGif,
  deleteGif,
  getGifsByMids,
};
