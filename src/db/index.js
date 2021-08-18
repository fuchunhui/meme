/**
 * 数据库文件
 */

import initSqlJs from 'sql.js';
import axios from 'axios';
import uuid from '../utils/uuid.js';

const baseUrl = process.env.MEME_BASE_URL;

const SQL = await initSqlJs({
  locateFile: file => `./public/db/${file}`
});

const buffer = await axios({
  url: `${baseUrl}/db/meme.db`,
  method: 'get',
  responseType: 'arraybuffer'
}).then(res => Promise.resolve(res.data));

const db = new SQL.Database(new Uint8Array(buffer));

const getDB = () => {
  return db;
};

/**
 * 保留建表语句
 */
const _initTable = () => {
  const sqlstr = `CREATE TABLE STORY (
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
  const contents = getDB().exec("SELECT * FROM STORY");
  console.log({...contents});
  console.log(JSON.stringify(contents));
};

const insert = ({title, image, x = 0, y = 0}) => {
  const sql = `INSERT INTO STORY VALUES ('${uuid()}', '${title}', '${image}', ${x}, ${y});`;
  getDB().run(sql);
};

export {
  queryAllTables,
  getTable,
  insert
};
