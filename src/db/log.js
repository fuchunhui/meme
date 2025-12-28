import { run } from './query.js';
import { LOG_TABLE } from './schema.js';

const insertLog = ({ fromid, text, date, ctx }) => {
  const sql = `INSERT INTO ${LOG_TABLE} (fromid, text, date) VALUES (:fromid, :text, :date);`;
  run(sql, { ':fromid': fromid, ':text': text, ':date': date }, ctx);
};

export {
  insertLog,
};
