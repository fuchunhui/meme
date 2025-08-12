import * as fs from 'fs';
import initSqlJs from 'sql.js';
import {config} from '../config/index.js';

export const STORY_TABLE = 'STORY';
export const GIF_TABLE = 'GIF';
export const IMAGE_TABLE = 'IMAGE';
export const ADDITIONAL_TABLE = 'ADDITIONAL';
export const TEXT_TABLE = 'TEXT';
export const LOG_TABLE = 'LOGGER';

export const STORY_TYPE = {
  'TEXT': 'TEXT',
  'REPEAT': 'REPEAT',
  'GIF': 'GIF',
  'IMAGE': 'IMAGE',
  'ADDITIONAL': 'ADDITIONAL',
};

export const IMAGE_TYPE = {
  'SVG': 'SVG',
  'PNG': 'PNG',
  'DB': 'DB'
};

const SQL = await initSqlJs({
  locateFile: file => `./public/db/${file}`
});
const MEME_DB_PATH = './public/db/meme.db'; // default db path
const meme_buffer = fs.readFileSync(MEME_DB_PATH);
const meme_db = new SQL.Database(new Uint8Array(meme_buffer));

const DB_MAP = {
  'meme': {
    'db': meme_db,
    'path': MEME_DB_PATH
  }
};

config.forEach(({path}) => {
  if (path === 'meme') {
    return;
  }

  const DB_PATH = `./public/db/${path}.db`;
  const buffer = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(new Uint8Array(buffer));
  DB_MAP[path] = {
    'db': db,
    'path': DB_PATH
  };
});

const getDB = (path = 'meme') => {
  const db = path ? DB_MAP[path].db : meme_db;
  return db;
};

const writeDB = (path = 'meme') => {
  const data = getDB(path).export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_MAP[path].path, buffer);
};

const queryAllTables = ctx => {
  return getDB(ctx.path).exec('SELECT name, sql FROM sqlite_master;');
};

const insertStoryTable = (options, ctx) => {
  const {mid, name, md5, type, feature = ''} = options;

  const sql = `INSERT INTO ${STORY_TABLE} (mid, name, md5, type, feature) `
    + `VALUES ('${mid}', '${name}', '${md5}', '${type}', '${feature}');`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
    return {
      error: false,
      data: mid
    };
  } catch (error) {
    return {
      error: true,
      data: error.toString()
    };
  }
};

const insertTextTable = (options, ctx) => {
  const {
    mid, x = 0, y = 0, max = 100,
    size = 32, font = 'sans-serif', color = 'black', stroke = 'transparent', swidth = 1,
    align = 'start', direction = 'down',
    blur = 0, degree = 0,
    senior = 1,
  } = options;

  const sql = `INSERT INTO ${TEXT_TABLE} `
    + `(mid, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree, senior) `
    + `VALUES ('${mid}', ${x}, ${y}, ${max}, '${size}', '${font}', '${color}', '${stroke}', ${swidth}, `
    + `'${align}', '${direction}', ${blur}, ${degree}, ${senior});`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const insertGifTable = (options, ctx) => {
  const {mid, frame = ''} = options;
  const sql = `INSERT INTO ${GIF_TABLE} (mid, frame) VALUES ('${mid}', '${frame}');`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const insertImageTable = (options, ctx) => {
  const {mid, x = 0, y = 0, width = 100, height = 100, ipath = IMAGE_TYPE.SVG} = options;

  const sql = `INSERT INTO ${IMAGE_TABLE} (mid, x, y, width, height, ipath) `
    + `VALUES ('${mid}', ${x}, ${y}, ${width}, ${height}, '${ipath}');`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const insertAdditionalTable = (options, ctx) => {
  const {mid, text = ''} = options;
  const sql = `INSERT INTO ${ADDITIONAL_TABLE} (mid, text) VALUES ('${mid}', '${text}');`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const updateTextTable = (options, ctx) => {
  const {
    mid, x = 0, y = 0, max = 100,
    size = 32, font = 'sans-serif', color = 'black', stroke = 'transparent', swidth = 1,
    align = 'start', direction = 'down',
    blur = 0, degree = 0,
    senior = 1,
  } = options;
  const sql = `UPDATE ${TEXT_TABLE} SET x = ${x}, y = ${y}, max = ${max}, size = ${size}, font = '${font}',`
    + ` color = '${color}', stroke = '${stroke}', swidth = ${swidth}, align = '${align}', direction = '${direction}',`
    + ` blur = ${blur}, degree = ${degree}, senior = ${senior} WHERE mid = '${mid}';`;
  try {
    getDB(ctx.path).run(sql);

    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

// 功能保留，页面上暂时不涉及到对 frame 模式的调整
const updateGifTable = (options, ctx) => {
  const {mid, frame = ''} = options;
  const sql = `UPDATE ${GIF_TABLE} SET frame = '${frame}' WHERE mid = '${mid}';`;
  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const updateImageTable = (options, ctx) => {
  const {mid, x = 0, y = 0, width = 100, height = 100, ipath = IMAGE_TYPE.SVG} = options;
  const sql = `UPDATE ${IMAGE_TABLE} SET x = ${x}, y = ${y}, width = ${width}, height = ${height},`
    + ` ipath = '${ipath}' WHERE mid = '${mid}';`;
  try {
    getDB(ctx.path).run(sql);

    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const updateAdditionalTable = (options, ctx) => {
  const {mid, text} = options;
  const sql = `UPDATE ${ADDITIONAL_TABLE} SET text = '${text}' WHERE mid = '${mid}';`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const updateName = (options, ctx) => {
  const {mid, name} = options;
  const sql = `UPDATE ${STORY_TABLE} SET name = '${name}' WHERE mid = '${mid}';`;

  try {
    getDB(ctx.path).run(sql);
    writeDB(ctx.path);
  } catch (error) {
    return error.toString();
  }
};

const getTable = (tableName = STORY_TABLE, ctx) => {
  const contents = [];
  const stmt = getDB(ctx.path).prepare(`SELECT * FROM ${tableName};`);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const getDataByColumn = (value, column = 'name', tableName = STORY_TABLE, ctx) => {
  const stmt = getDB(ctx.path).prepare(`SELECT * FROM ${tableName} WHERE ${column} = :val`);
  const result = stmt.getAsObject({':val': value});
  stmt.free();
  return result;
};

const _getDataFromTable = (sql, ctx) => {
  const contents = [];
  const stmt = getDB(ctx.path).prepare(sql);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const getDataListByColumn = (value, column = 'name', tableName = STORY_TABLE, ctx) => {
  const sql = `SELECT * FROM ${tableName} WHERE ${column} = '${value}';`;
  return _getDataFromTable(sql, ctx);
};

const getNamedColumnFromTable = (tableName = STORY_TABLE, columns = [], ctx) => {
  const columnSQL = columns.length ? columns.join(', ') : '*';
  const sql = `SELECT ${columnSQL} FROM ${tableName};`;
  return _getDataFromTable(sql, ctx);
};

// TODO 考虑后续扩充日志记录
const insertLog = ({fromid, text, date, ctx}) => {
  const sql = `INSERT INTO ${LOG_TABLE} (fromid, text, date) VALUES ('${fromid}', '${text}', '${date}');`;
  getDB(ctx.path).run(sql);

  writeDB(ctx.path);
};

export {
  writeDB,
  getDB,
  insertStoryTable,
  insertTextTable,
  insertGifTable,
  insertImageTable,
  insertAdditionalTable,
  updateTextTable,
  updateGifTable,
  updateImageTable,
  updateAdditionalTable,
  updateName,
  getTable,
  getDataByColumn,
  getDataListByColumn,
  getNamedColumnFromTable,
  insertLog
};
