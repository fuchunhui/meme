import { run } from './query.js';
import { TEXT_TABLE } from './constant.js';

const insertTextTable = (options, ctx) => {
  const {
    mid,
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
    (mid, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree, senior)
    VALUES (:mid, :x, :y, :max, :size, :font, :color, :stroke, :swidth, :align, :direction, :blur, :degree, :senior);`;

  try {
    run(
      sql,
      {
        ':mid': mid,
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
      },
      ctx,
    );
  } catch (error) {
    return error.toString();
  }
};

const updateTextTable = (options, ctx) => {
  const {
    mid,
    x = 0,
    y = 0,
    max = 100,
    size = 32,
    font = 'sans-serif',
    color = 'black',
    stroke = 'transparent',
    swidth = 1,
    align = 'start',
    direction = 'down',
    blur = 0,
    degree = 0,
    senior = 1,
  } = options;

  const sql = `UPDATE ${TEXT_TABLE} SET
    x = :x,
    y = :y,
    max = :max,
    size = :size,
    font = :font,
    color = :color,
    stroke = :stroke,
    swidth = :swidth,
    align = :align,
    direction = :direction,
    blur = :blur,
    degree = :degree,
    senior = :senior
    WHERE mid = :mid;`;

  try {
    run(
      sql,
      {
        ':mid': mid,
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
      },
      ctx,
    );
  } catch (error) {
    return error.toString();
  }
};

export {
  insertTextTable,
  updateTextTable,
};
