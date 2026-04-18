import { run, get, all } from '../query.js';
import { STATIC_ITEM_TABLE } from '../constant.js';

const createStaticItem = (mid, hash, ext = 'png', tags = '', ctx) => {
  const sql = `INSERT INTO ${STATIC_ITEM_TABLE} (mid, hash, ext, tags)
    VALUES (:mid, :hash, :ext, :tags);`;
  run(sql, { ':mid': mid, ':hash': hash, ':ext': ext, ':tags': tags }, ctx);
};

const getStaticItemsByMid = (mid, ctx) => {
  const sql = `SELECT * FROM ${STATIC_ITEM_TABLE} WHERE mid = :mid ORDER BY id DESC;`;
  return all(sql, { ':mid': mid }, ctx);
};

const getStaticItemById = (id, ctx) => {
  const sql = `SELECT * FROM ${STATIC_ITEM_TABLE} WHERE id = :id;`;
  return get(sql, { ':id': id }, ctx);
};

const getStaticItemByHash = (mid, hash, ctx) => {
  const sql = `SELECT * FROM ${STATIC_ITEM_TABLE} WHERE mid = :mid AND hash = :hash;`;
  return get(sql, { ':mid': mid, ':hash': hash }, ctx);
};

const getStaticItemsByHashExt = (hash, ext, ctx) => {
  const sql = `SELECT * FROM ${STATIC_ITEM_TABLE} WHERE hash = :hash AND ext = :ext;`;
  return all(sql, { ':hash': hash, ':ext': ext }, ctx);
};

const deleteStaticItemById = (id, ctx) => {
  const sql = `DELETE FROM ${STATIC_ITEM_TABLE} WHERE id = :id;`;
  run(sql, { ':id': id }, ctx);
};

export {
  createStaticItem,
  getStaticItemsByMid,
  getStaticItemById,
  getStaticItemByHash,
  getStaticItemsByHashExt,
  deleteStaticItemById,
};
