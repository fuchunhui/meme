import * as fs from 'fs';
import initSqlJs from 'sql.js';
import uuid from '../utils/uuid.js';
import informationData from '../config/common.js';
import specialData from '../config/special/index.js';
import seriesData from '../config/series.js';
import featureData from '../config/feature.js';
import materialData from '../config/material.js';
import mysteryData from '../config/mystery.js';

export const STORY_TABLE = 'STORY';
export const TEXT_TABLE = 'TEXT';
export const LOG_TABLE = 'LOGGER';
export const SPECIAL_TABLE = 'SPECIAL';
export const SERIES_TABLE = 'SERIES';
export const FEATURE_TABLE = 'FEATURE';
export const MATERIAL_TABLE = 'MATERIAL';
export const MYSTERY_TABLE = 'MYSTERY';
export const FEATURE_TYPE = {
  'COMMAND': 'COMMAND',
  'TEXT': 'TEXT',
  'IMAGE': 'IMAGE'
};
const FEATURE_SOURCE_NAME = {
  'COMMON': STORY_TABLE,
  'SPECIAL': SPECIAL_TABLE,
  'SERIES': SERIES_TABLE
};
export const FEATURE_IMAGE_TYPE = {
  'SVG': 'SVG',
  'PNG': 'PNG',
  'DB': 'DB'
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

/**
 * 保留建表语句
 */
const _initTable = () => {
  const sql = `CREATE TABLE ${STORY_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    feature CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    senior INTEGER CHECK(senior IN (0, 1)) NOT NULL DEFAULT 0
  );`;
  const text = `CREATE TABLE ${TEXT_TABLE} (
    tid INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 100,
    font CHAR(50) NOT NULL,
    color CHAR(20) NOT NULL,
    align CHAR(10) NOT NULL,
    direction CHAR(10) NOT NULL,
    blur REAL DEFAULT 0
  );`;
  const logger = `CREATE TABLE ${LOG_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromid CHAR(100) NOT NULL,
    text CHAR(200) NOT NULL,
    date Date
  );`;
  getDB().run(sql + text + logger);

  informationData.forEach(item => {
    insertTable(item, false);
  });
};

const initDB = () => {
  _resetDB();
  _initTable();
  _initSeriesTable();
  _initSpecialTable();
  _initMaterialTable();
  _initMysteryTable();
  writeDB();
};

const writeDB = () => {
  const data = getDB().export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_PATH, buffer);
};

const _resetDB = () => {
  const nameList = [
    STORY_TABLE,
    TEXT_TABLE,
    LOG_TABLE,
    SPECIAL_TABLE,
    SERIES_TABLE,
    FEATURE_TABLE,
    MATERIAL_TABLE
  ];
  const sql = nameList.map(item => `DROP TABLE IF EXISTS ${item};`).join('');
  getDB().run(sql);
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
    color = 'black', align = 'start', direction = 'down', blur = 0} = options;
  const mid = _mid && /^meme_/g.test(_mid) ? _mid : uuid();

  const sql = `INSERT INTO ${tableName} (mid, title, feature, image, senior) `
    + `VALUES ('${mid}', '${title}', '${feature}', '${image}', '${senior}');`;
  const text = `INSERT INTO ${TEXT_TABLE} (mid, x, y, max, font, color, align, direction, blur) `
    + `VALUES ('${mid}', ${x}, ${y}, ${max}, '${font}', '${color}', '${align}', '${direction}', ${blur});`;

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
    color = 'black', align = 'start', direction = 'down', blur = 0} = options;
  const text = `UPDATE ${TEXT_TABLE} SET x = ${x}, y = ${y}, max = ${max}, font = '${font}',`
    + ` color = '${color}', align = '${align}', direction = '${direction}', blur = ${blur} WHERE mid = '${mid}';`;
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

const _initSpecialTable = () => {
  const sql = `CREATE TABLE ${SPECIAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    feature CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    senior INTEGER CHECK(senior IN (0, 1)) NOT NULL DEFAULT 0
  );`;
  getDB().run(sql);

  specialData.forEach(item => {
    insertTable(item, false, SPECIAL_TABLE);
  });
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

const _initSeriesTable = () => {
  const sql = `CREATE TABLE ${SERIES_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    feature CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    senior INTEGER CHECK(senior IN (0, 1)) NOT NULL DEFAULT 0
  );`;
  const feature = `CREATE TABLE ${FEATURE_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    feature CHAR(100) COLLATE NOCASE,
    type CHAR(50) CHECK(type IN ('${FEATURE_TYPE.COMMAND}', '${FEATURE_TYPE.IMAGE}', `
      + `'${FEATURE_TYPE.TEXT}')) NOT NULL DEFAULT '${FEATURE_TYPE.COMMAND}',
    sid INTEGER CHAR(50) DEFAULT NULL,
    sname CHAR(50) CHECK(sname IN ('${FEATURE_SOURCE_NAME.COMMON}', '${FEATURE_SOURCE_NAME.SERIES}', `
      + `'${FEATURE_SOURCE_NAME.SPECIAL}')) NOT NULL DEFAULT '${FEATURE_SOURCE_NAME.COMMON}',
    tid INTEGER CHAR(50) DEFAULT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    width INT DEFAULT 100,
    height INT DEFAULT 100,
    ipath CHAR(50) CHECK(ipath IN ('${FEATURE_IMAGE_TYPE.DB}', '${FEATURE_IMAGE_TYPE.SVG}', `
      + `'${FEATURE_IMAGE_TYPE.PNG}')) NOT NULL DEFAULT '${FEATURE_IMAGE_TYPE.DB}'
  );`;
  getDB().run(sql + feature);

  seriesData.forEach(item => {
    insertTable(item, false, SERIES_TABLE);
  });

  featureData.forEach(item => {
    insertFeatureTable(item, false);
  });
};

const insertFeatureTable = (options, write = true) => {
  const {mid: _mid, feature, type = 'COMMAND', sid = '', sname = FEATURE_SOURCE_NAME.COMMON, tid = '',
    x = 0, y = 0, width = 100, height = 100, ipath = FEATURE_IMAGE_TYPE.DB} = options;
  const mid = _mid && /^meme_/g.test(_mid) ? _mid : uuid();
  const sql = `INSERT INTO ${FEATURE_TABLE} (mid, feature, type, sid, sname, tid, x, y, width, height, ipath) `
    + `VALUES ('${mid}', '${feature}', '${type}', '${sid}', '${sname}', '${tid}', ${x}, ${y}, `
    + `${width}, ${height}, '${ipath}');`;

  try {
    getDB().run(sql);
    write && writeDB();
    return {
      error: false,
      data: feature
    };
  } catch (error) {
    return {
      error: true,
      data: error.toString()
    };
  }
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

const _initMaterialTable = () => {
  const sql = `CREATE TABLE ${MATERIAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL
  );`;
  getDB().run(sql);

  materialData.forEach(item => {
    insertMaterialTable(item, false, MATERIAL_TABLE);
  });
};

const insertMaterialTable = (options, write = true) => {
  const {mid: _mid, title, image} = options;
  const mid = _mid && /^meme_/g.test(_mid) ? _mid : uuid();

  const sql = `INSERT INTO ${MATERIAL_TABLE} (mid, title, image) VALUES ('${mid}', '${title}', '${image}');`;

  try {
    getDB().run(sql);
    write && writeDB();
    return {
      error: false,
      data: `Material: ${title}`
    };
  } catch (error) {
    return {
      error: true,
      data: error.toString()
    };
  }
};

const _initMysteryTable = () => {
  const sql = `CREATE TABLE ${MYSTERY_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title CHAR(100) COLLATE NOCASE,
    text CHAR(200) NOT NULL,
    param CHAR(200) NOT NULL
  );`;
  getDB().run(sql);

  mysteryData.forEach(item => {
    insertMysteryTable(item, false, MYSTERY_TABLE);
  });
};

const insertMysteryTable = (options, write = true) => {
  const {title, text, param} = options;
  const sql = `INSERT INTO ${MYSTERY_TABLE} (title, text, param) VALUES ('${title}', '${text}', '${param}');`;

  try {
    getDB().run(sql);
    write && writeDB();
    return {
      error: false,
      data: `Mystery: ${title}`
    };
  } catch (error) {
    return {
      error: true,
      data: error.toString()
    };
  }
};

const getRandom = (tableName = MYSTERY_TABLE, column = '*', condition = '') => {
  const expression = condition ? `where ${condition}` : '';
  const sql = `SELECT ${column} FROM ${tableName} ${expression} ORDER BY RANDOM() limit 1`;
  const stmt = getDB().prepare(sql);
  const result = stmt.getAsObject({});
  stmt.free();
  return result;
};

export {
  initDB,
  writeDB,
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
  getRandom
};
