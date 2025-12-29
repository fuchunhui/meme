import { run } from './query.js';
import { GIF_TABLE } from './constant.js';

const insertGifTable = (options, ctx) => {
  const { mid, frame = '' } = options;
  const sql = `INSERT INTO ${GIF_TABLE} (mid, frame) VALUES (:mid, :frame);`;

  try {
    run(sql, { ':mid': mid, ':frame': frame }, ctx);
  } catch (error) {
    return error.toString();
  }
};

const updateGifTable = (options, ctx) => {
  const { mid, frame = '' } = options;
  const sql = `UPDATE ${GIF_TABLE} SET frame = :frame WHERE mid = :mid;`;

  try {
    run(sql, { ':mid': mid, ':frame': frame }, ctx);
  } catch (error) {
    return error.toString();
  }
};

export {
  insertGifTable,
  updateGifTable,
};
