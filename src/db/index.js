/**
 * 数据库文件
 */
import * as fs from 'fs';
import initSqlJs from 'sql.js';
import uuid from '../utils/uuid.js';

const TABLE_NAME = 'STORY';
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
  const sqlstr = `CREATE TABLE ${TABLE_NAME} (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    MID char(50) NOT NULL,
    TITLE char(100),
    IMAGE TEXT NOT NULL,
    X INT DEFAULT 0,
    Y INT DEFAULT 0);`
  getDB().run(sqlstr);
};

const initDB = () => {
  _resetDB();
  _initTable();
  insertTable({ // 更改为从初始化脚本读取
    title: 'aa',
    image: 'asd'
  })
  writeDB();
};

const writeDB = () => {
  const data = getDB().export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_PATH, buffer);
};

const _resetDB = () => {
  const sql = `DROP TABLE ${TABLE_NAME}`;
  getDB().run(sql);
};

const queryAllTables = () => {
  return getDB().exec('SELECT name, sql FROM sqlite_master');
};

const getTable = () => {
  const contents = getDB().exec(`SELECT * FROM ${TABLE_NAME}`);
  console.log({...contents});
  console.log(JSON.stringify(contents));
};

const insertTable = ({title, image, x = 0, y = 0}) => {
  const sql = `INSERT INTO ${TABLE_NAME} (MID, TITLE, IMAGE, X, Y) VALUES ('${uuid()}', '${title}', '${image}', ${x}, ${y});`;
  getDB().run(sql);
};

const deleteTable = (like) => {
  const sql = `DELETE FROM ${TABLE_NAME} WHERE TITLE NOT LIKE '${like}'`
  getDB().run(sql);
}

export {
  initDB,
  writeDB,
  queryAllTables,
  getTable,
  insertTable,
  deleteTable
};
