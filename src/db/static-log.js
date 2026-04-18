import { all, run } from './query.js';
import { STATIC_SEND_LOG_TABLE } from './constant.js';

const normalizeDate = value => {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number' || typeof value === 'string') return value;
  if (value == null) return Date.now();
  return String(value);
};

const insertStaticSendLog = ({ fromid, mid, itemId, date, ctx }) => {
  const sql = `INSERT INTO ${STATIC_SEND_LOG_TABLE} (fromid, mid, item_id, date)
    VALUES (:fromid, :mid, :item_id, :date);`;
  run(sql, {
    ':fromid': fromid,
    ':mid': mid,
    ':item_id': itemId,
    ':date': normalizeDate(date),
  }, ctx);
};

const getRecentStaticSentItemIds = (fromid, mid, limit = 30, ctx) => {
  const sql = `SELECT item_id FROM ${STATIC_SEND_LOG_TABLE}
    WHERE fromid = :fromid AND mid = :mid
    ORDER BY id DESC
    LIMIT :limit;`;
  const rows = all(sql, { ':fromid': fromid, ':mid': mid, ':limit': limit }, ctx);
  return rows.map(item => item.item_id);
};

export {
  insertStaticSendLog,
  getRecentStaticSentItemIds,
};
