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
    ID char(50) PRIMARY KEY NOT NULL,
    TITLE char(100),
    IMAGE TEXT NOT NULL,
    X INT NOT NULL,
    Y INT NOT NULL);`
    getDB().run(sqlstr);
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
  const sql = `INSERT INTO ${TABLE_NAME} VALUES ('${uuid()}', '${title}', '${image}', ${x}, ${y});`;
  getDB().run(sql);
};

const writeDB = () => {
  const data = getDB().export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_PATH, buffer);
};

const deleteTable = (like) => {
  const sql = `DELETE FROM ${TABLE_NAME} WHERE TITLE NOT LIKE '${like}'`
  getDB().run(sql);
}

export {
  queryAllTables,
  getTable,
  insertTable,
  writeDB,
  deleteTable
};
