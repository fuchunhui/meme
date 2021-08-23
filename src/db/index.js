/**
 * 数据库文件
 */
import * as fs from 'fs';
import initSqlJs from 'sql.js';
import uuid from '../utils/uuid.js';
import information from '../config/information.js';

const TABLE_NAME = 'STORY';
const TEXT_TABLE = 'TEXT';
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
  const sql = `CREATE TABLE ${TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL
  );`
  const textSQL = `CREATE TABLE ${TEXT_TABLE} (
    tid INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 0,
    font CHAR(50) NOT NULL,
    color CHAR(20) NOT NULL,
    align CHAR(10) NOT NULL
  );`
  getDB().run(sql + textSQL);
};

const initDB = () => {
  _resetDB();
  _initTable();
  information.forEach(item => {
    insertTable(item);
  });
  writeDB();
};

const writeDB = () => {
  const data = getDB().export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_PATH, buffer);
};

const _resetDB = () => {
  const sql = `DROP TABLE ${TABLE_NAME};`;
  const text = `DROP TABLE ${TEXT_TABLE};`;
  getDB().run(sql + text);
};

const queryAllTables = () => {
  return getDB().exec('SELECT name, sql FROM sqlite_master');
};

const getTable = () => {
  const contents = getDB().exec(`SELECT * FROM ${TABLE_NAME} INNER JOIN ${TEXT_TABLE} USING(mid)`);
  return contents;
};

const insertTable = options => {
  const {title, image, x = 0, y = 0, max = 0, font = '32px sans-serif', color = 'black', align = 'start'} = options;
  const mid = uuid();
  const sql = `INSERT INTO ${TABLE_NAME} (mid, title, image) VALUES ('${mid}', '${title}', '${image}');`;
  const text = `INSERT INTO ${TEXT_TABLE} (mid, x, y, max, font, color, align) `
    + `VALUES ('${mid}', ${x}, ${y}, ${max}, '${font}', '${color}', '${align}');`;
  getDB().run(sql + text);
};

const deleteTable = like => {
  const text = `DELETE FROM ${TEXT_TABLE} WHERE mid in (SELECT mid FROM ${TABLE_NAME} WHERE title NOT LIKE '${like}');`;
  const sql = `DELETE FROM ${TABLE_NAME} WHERE title NOT LIKE '${like}';`;
  getDB().run(text);
  getDB().run(sql);

  writeDB();
};

const getDataByColumn = (column, value) => {
  const stmt = getDB().prepare(`SELECT * FROM ${TABLE_NAME} INNER JOIN ${TEXT_TABLE} USING(mid) WHERE ${column} = :val`);
  const result = stmt.getAsObject({':val': value});
  stmt.free();
  return result;
};

export {
  initDB,
  writeDB,
  queryAllTables,
  getTable,
  insertTable,
  deleteTable,
  getDataByColumn
};
