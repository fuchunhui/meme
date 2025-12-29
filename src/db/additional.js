import { run } from './query.js';
import { ADDITIONAL_TABLE } from './constant.js';

const insertAdditionalTable = (options, ctx) => {
  const { mid, text = '' } = options;
  const sql = `INSERT INTO ${ADDITIONAL_TABLE} (mid, text) VALUES (:mid, :text);`;

  try {
    run(sql, { ':mid': mid, ':text': text }, ctx);
  } catch (error) {
    return error.toString();
  }
};

const updateAdditionalTable = (options, ctx) => {
  const { mid, text = '' } = options;
  const sql = `UPDATE ${ADDITIONAL_TABLE} SET text = :text WHERE mid = :mid;`;

  try {
    run(sql, { ':mid': mid, ':text': text }, ctx);
  } catch (error) {
    return error.toString();
  }
};

export {
  insertAdditionalTable,
  updateAdditionalTable,
};
