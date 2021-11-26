/**
 * 数据库文件
 */

import * as fs from 'fs';
import initSqlJs from 'sql.js';
import uuid from '../utils/uuid.js';
import informationData from '../config/common.js';
import seriesData from '../config/series/index.js';
import featureData from '../config/feature.js';
import specialData from '../config/special/index.js';

export const STORY_TABLE = 'STORY';
export const TEXT_TABLE = 'TEXT';
export const LOG_TABLE = 'LOGGER';
export const SPECIAL_TABLE = 'SPECIAL';
export const SERIES_TABLE = 'SERIES';
export const FEATURE_TABLE = 'FEATURE';
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
    image TEXT NOT NULL
  );`
  const text = `CREATE TABLE ${TEXT_TABLE} (
    tid INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 100,
    font CHAR(50) NOT NULL,
    color CHAR(20) NOT NULL,
    align CHAR(10) NOT NULL,
    direction CHAR(10) NOT NULL
  );`
  const logger = `CREATE TABLE ${LOG_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromid CHAR(100) NOT NULL,
    text CHAR(100) NOT NULL,
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
    FEATURE_TABLE
  ];
  const sql = nameList.map(item => `DROP TABLE IF EXISTS ${item};`).join('');
  getDB().run(sql);
};

const queryAllTables = () => {
  return getDB().exec('SELECT name, sql FROM sqlite_master');
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
  const {title, feature, image, x = 0, y = 0, max = 100, font = '32px sans-serif',
    color = 'black', align = 'start', direction = 'down'} = options;
  const mid = uuid();
  const sql = `INSERT INTO ${tableName} (mid, title, feature, image) VALUES ('${mid}', '${title}', '${feature}', '${image}');`;
  const text = `INSERT INTO ${TEXT_TABLE} (mid, x, y, max, font, color, align, direction) `
    + `VALUES ('${mid}', ${x}, ${y}, ${max}, '${font}', '${color}', '${align}', '${direction}');`;

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

const updateTextTable = (options) => {
  const {mid, x = 0, y = 0, max = 100, font = '32px sans-serif',
    color = 'black', align = 'start', direction = 'down'} = options;
  const text = `UPDATE ${TEXT_TABLE} SET x = ${x}, y = ${y}, max = ${max}, font = '${font}',`
    + ` color = '${color}', align = '${align}', direction = '${direction}' WHERE mid = '${mid}';`;
  try {
    getDB().run(text);

    writeDB();
  } catch (error) {
    return error.toString();
  }
};

const deleteTable = like => {
  const text = `DELETE FROM ${TEXT_TABLE} WHERE mid in (SELECT mid FROM ${STORY_TABLE} WHERE title NOT LIKE '${like}');`;
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
    image TEXT NOT NULL
  );`
  getDB().run(sql);

  specialData.forEach((item, index) => {
    insertTable(item, false, SPECIAL_TABLE);
  });
}

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
    image TEXT NOT NULL
  );`
  const feature = `CREATE TABLE ${FEATURE_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature CHAR(100) COLLATE NOCASE,
    type CHAR(50) CHECK(type IN ('TEXT', 'IMAGE')) NOT NULL DEFAULT 'TEXT',
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    width INT DEFAULT 100,
    height INT DEFAULT 100
  );`
  getDB().run(sql + feature);

  seriesData.forEach((item, index) => {
    insertTable(item, false, SERIES_TABLE);
  });

  featureData.forEach((item, index) => {
    insertFeatureTable(item);
  });
}

const insertFeatureTable = (options) => {
  const {feature, type, x = 0, y = 0, width = 100, height = 100} = options;
  const sql = `INSERT INTO ${FEATURE_TABLE} (feature, type, x, y, width, height) `
    + `VALUES ('${feature}', '${type}', ${x}, ${y}, ${width}, ${height});`;

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
  getSingleTable
};
