import { run } from './query.js';
import { IMAGE_TABLE, IMAGE_TYPE } from './schema.js';

const insertImageTable = (options, ctx) => {
  const {
    mid,
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    ipath = IMAGE_TYPE.SVG,
  } = options;

  const sql = `INSERT INTO ${IMAGE_TABLE} (mid, x, y, width, height, ipath)
    VALUES (:mid, :x, :y, :width, :height, :ipath);`;

  try {
    run(
      sql,
      {
        ':mid': mid,
        ':x': x,
        ':y': y,
        ':width': width,
        ':height': height,
        ':ipath': ipath,
      },
      ctx,
    );
  } catch (error) {
    return error.toString();
  }
};

const updateImageTable = (options, ctx) => {
  const {
    mid,
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    ipath = IMAGE_TYPE.SVG,
  } = options;

  const sql = `UPDATE ${IMAGE_TABLE} SET
    x = :x,
    y = :y,
    width = :width,
    height = :height,
    ipath = :ipath
    WHERE mid = :mid;`;

  try {
    run(
      sql,
      {
        ':mid': mid,
        ':x': x,
        ':y': y,
        ':width': width,
        ':height': height,
        ':ipath': ipath,
      },
      ctx,
    );
  } catch (error) {
    return error.toString();
  }
};

export {
  insertImageTable,
  updateImageTable,
};
