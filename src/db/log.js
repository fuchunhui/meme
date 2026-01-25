import { run } from './query.js';
import { LOG_TABLE } from './constant.js';

const normalizeDate = value => {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number' || typeof value === 'string') return value;
  if (value == null) return Date.now();
  return String(value);
};

const insertLog = ({ fromid, text, date, ctx }) => {
  const sql = `INSERT INTO ${LOG_TABLE} (fromid, text, date) VALUES (:fromid, :text, :date);`;
  run(sql, { ':fromid': fromid, ':text': text, ':date': normalizeDate(date) }, ctx);
};

export {
  insertLog,
};
