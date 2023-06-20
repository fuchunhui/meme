import * as fs from 'fs';
import initSqlJs from 'sql.js';
import uuid from '../utils/uuid.js';

export const STORY_TABLE = 'STORY';
export const TEXT_TABLE = 'TEXT';
export const SERIES_TABLE = 'SERIES';
export const FEATURE_TABLE = 'FEATURE';
export const MYSTERY_TABLE = 'MYSTERY';
export const MATERIAL_TABLE = 'MATERIAL';
export const SPECIAL_TABLE = 'SPECIAL';
export const LOG_TABLE = 'LOGGER';
export const ADDITIONAL_TABLE = 'ADDITIONAL';

export const FEATURE_TYPE = {
  'COMMAND': 'COMMAND',
  'TEXT': 'TEXT',
  'IMAGE': 'IMAGE',
  'REPEAT': 'REPEAT'
};
export const FEATURE_SOURCE_NAME = {
  'COMMON': STORY_TABLE,
  'SPECIAL': SPECIAL_TABLE,
  'SERIES': SERIES_TABLE
};
export const FEATURE_IMAGE_TYPE = {
  'SVG': 'SVG',
  'PNG': 'PNG',
  'DB': 'DB',
  'RANDOM': 'RANDOM'
};

const DB_PATH = './public/db/meme.db';

const SQL = await initSqlJs({
  locateFile: file => `./public/db/${file}`
});
const buffer = fs.readFileSync(DB_PATH);

const db = new SQL.Database(new Uint8Array(buffer));

const getDB = () => {
  return db;
};

const writeDB = () => {
  const data = getDB().export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_PATH, buffer);
};


const queryAllTables = () => {
  return getDB().exec('SELECT name, sql FROM sqlite_master;');
};

const getTable = (tableName = STORY_TABLE, join = true) => {
  const contents = [];
  const sqlplus = join ? ` INNER JOIN ${TEXT_TABLE} USING(mid)` : '';
  const stmt = getDB().prepare(`SELECT * FROM ${tableName}${sqlplus};`);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const insertTable = (options, write = true, tableName = STORY_TABLE) => {
  const {mid: _mid, title, feature, image, senior = 0, x = 0, y = 0, max = 100, font = '32px sans-serif',
    color = 'black', align = 'start', direction = 'down', blur = 0, degree = 0} = options;
  const mid = _mid && /^meme_/g.test(_mid) ? _mid : uuid();

  const sql = `INSERT INTO ${tableName} (mid, title, feature, image, senior) `
    + `VALUES ('${mid}', '${title}', '${feature}', '${image}', '${senior}');`;
  const text = `INSERT INTO ${TEXT_TABLE} (mid, x, y, max, font, color, align, direction, blur, degree) `
    + `VALUES ('${mid}', ${x}, ${y}, ${max}, '${font}', '${color}', '${align}', '${direction}', ${blur}, ${degree});`;

  try {
    getDB().run(sql + text);
    write && writeDB();
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

const updateTable = (options, tableName = STORY_TABLE) => {
  const {mid, title, feature, image} = options;
  const sql = `UPDATE ${tableName} SET title = '${title}', feature = '${feature}', image = '${image}' WHERE mid = '${mid}';`;

  try {
    getDB().run(sql);
    writeDB();
  } catch (error) {
    return error.toString();
  }
};

const updateTextTable = options => {
  const {mid, x = 0, y = 0, max = 100, font = '32px sans-serif',
    color = 'black', align = 'start', direction = 'down', blur = 0, degree = 0} = options;
  const text = `UPDATE ${TEXT_TABLE} SET x = ${x}, y = ${y}, max = ${max}, font = '${font}',`
    + ` color = '${color}', align = '${align}', direction = '${direction}', blur = ${blur},`
    + ` degree = ${degree} WHERE mid = '${mid}';`;
  try {
    getDB().run(text);

    writeDB();
  } catch (error) {
    return error.toString();
  }
};

const deleteTable = like => {
  const text = `DELETE FROM ${TEXT_TABLE} WHERE mid in `
    + `(SELECT mid FROM ${STORY_TABLE} WHERE title NOT LIKE '${like}');`;
  const sql = `DELETE FROM ${STORY_TABLE} WHERE title NOT LIKE '${like}';`;
  getDB().run(text);
  getDB().run(sql);

  writeDB();
};

const getDataByColumn = (value, column = 'title', name = STORY_TABLE) => {
  const stmt = getDB().prepare(`SELECT * FROM ${name} INNER JOIN ${TEXT_TABLE} USING(mid) WHERE ${column} = :val`);
  const result = stmt.getAsObject({':val': value});
  stmt.free();
  return result;
};

const getDataListByColumn = (value, column = 'title', name = STORY_TABLE) => {
  const contents = [];
  const stmt = getDB().prepare(`SELECT * FROM ${name} WHERE ${column} = '${value}'`);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const insertLog = ({fromid, text, date}, write = true) => {
  const sql = `INSERT INTO ${LOG_TABLE} (fromid, text, date) VALUES ('${fromid}', '${text}', '${date}');`;
  getDB().run(sql);

  write && writeDB();
};

const getColumnByTable = (value, column, table) => {
  const stmt = getDB().prepare(`SELECT * FROM ${table} WHERE ${column} = :val`);
  const result = stmt.getAsObject({':val': value});
  stmt.free();
  return result;
};

const getSpecialDataListByColumn = (value, column = 'feature') => {
  const contents = [];
  const stmt = getDB().prepare(`SELECT * FROM ${SPECIAL_TABLE} INNER JOIN ${TEXT_TABLE} USING(mid) WHERE ${column} = '${value}'`);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const updateFeatureTable = options => {
  const list = [];
  Object.keys(options).forEach(key => {
    if (key === 'mid') {
      return;
    }
    const value = options[key];
    const realValue = typeof value === 'string' ? `'${value}'` : value;
    list.push(`${key}=${realValue}`);
  });

  const append = list.join(', ');
  const sql = `UPDATE ${FEATURE_TABLE} SET ${append} WHERE mid = '${options.mid}';`;

  try {
    getDB().run(sql);

    writeDB();
  } catch (error) {
    return error.toString();
  }
};

const getSingleTable = (tableName = STORY_TABLE) => {
  const contents = [];
  const stmt = getDB().prepare(`SELECT * FROM ${tableName};`);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const getNamedColumnFromTable = (tableName = MATERIAL_TABLE, columns = []) => {
  const columnSQL = columns.length ? columns.join(', ') : '*';
  const sql = `SELECT ${columnSQL} FROM ${tableName};`;
  return _getDataFromTable(sql);
};

const _getDataFromTable = sql => {
  const contents = [];
  const stmt = getDB().prepare(sql);
  while (stmt.step()) {
    const cell = stmt.getAsObject();
    contents.push(cell);
  }
  stmt.free();
  return contents;
};

const getRandom = (tableName = MYSTERY_TABLE, columns = [], condition = '') => {
  const expression = condition ? `where ${condition}` : '';

  const column = typeof columns === 'string'
    ? columns
    : columns.length
      ? columns.length > 1 ? columns.join(', ') : columns[0]
      : '*';
  const sql = `SELECT ${column} FROM ${tableName} ${expression} ORDER BY RANDOM() limit 1`;
  const stmt = getDB().prepare(sql);
  const result = stmt.getAsObject({});
  stmt.free();
  return result;
};

const updateAdditionalTable = options => {
  const {mid, text} = options;
  const sql = `UPDATE ${ADDITIONAL_TABLE} SET text = '${text}' WHERE mid = '${mid}';`;

  try {
    getDB().run(sql);
    writeDB();
  } catch (error) {
    return error.toString();
  }
};

export {
  writeDB,
  getDB,
  queryAllTables,
  getTable,
  insertTable,
  updateTable,
  deleteTable,
  getDataByColumn,
  getColumnByTable,
  getDataListByColumn,
  getSpecialDataListByColumn,
  updateTextTable,
  insertLog,
  getSingleTable,
  updateFeatureTable,
  getNamedColumnFromTable,
  getRandom,
  updateAdditionalTable
};
