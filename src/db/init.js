import {
  STORY_TABLE,
  GIF_TABLE,
  IMAGE_TABLE,
  ADDITIONAL_TABLE,
  TEXT_TABLE,
  LOG_TABLE,
  IMAGE_TYPE,
  getDB,
  writeDB
} from './index.js';

let currentDB = '';

const setLocalDB = path => {
  currentDB = path || 'meme';
};

const getLocalDB = () => {
  return getDB(currentDB);
};

const resetDB = () => {
  const nameList = [
    STORY_TABLE,
    TEXT_TABLE,
    GIF_TABLE,
    IMAGE_TABLE,
    ADDITIONAL_TABLE,
    LOG_TABLE
  ];
  const sql = nameList.map(item => `DROP TABLE IF EXISTS ${item};`).join('');
  getLocalDB().run(sql);
};

/**
 * 初始化数据库脚本，有可能不会使用，充当明确建表语句的作用
 * @param {String} path 本地数据库路径
 */
const initDB = path => {
  setLocalDB(path);
  resetDB();

  initStory();
  initGif();
  initImage();
  initAdditional();
  initText();
  initLog();

  writeDB(currentDB);
};

/**
 * 初始化 Story 表
 * @description
 * 1. id: 主键，自增
 * 2. mid:唯一标识
 * 3. name: 名称
 * 4. type: 类型，取值范围为 TEXT, REPEAT, GIF, IMAGE, ADDITIONAL
 * 5. feature: 特性描述，用于后续 AI 处理使用
 */
const initStory = () => {
  const sql = `CREATE TABLE ${STORY_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL,
    name VARCHAR(20) COLLATE NOCASE,
    md5 CHAR(32) NOT NULL,
    type VARCHAR(20) CHECK(type IN ('${FEATURE_TYPE.TEXT}', '${FEATURE_TYPE.REPEAT}', '${FEATURE_TYPE.GIF}', `
      + `'${FEATURE_TYPE.IMAGE}', '${FEATURE_TYPE.ADDITIONAL}')) NOT NULL DEFAULT '${FEATURE_TYPE.TEXT}',
    feature VARCHAR(100) COLLATE NOCASE
  );`;
  getLocalDB().run(sql);
};

const initGif = () => {
  const sql = `CREATE TABLE ${GIF_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL,
    frame VARCHAR(32) NOT NULL DEFAULT NORMAL
  );`;
  getLocalDB().run(sql);
};

const initImage = () => {
  const sql = `CREATE TABLE ${IMAGE_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    width INT DEFAULT 100,
    height INT DEFAULT 100,
    ipath VARCHAR(16) CHECK(ipath IN ('${IMAGE_TYPE.DB}', '${IMAGE_TYPE.SVG}', '${IMAGE_TYPE.PNG}'))`
      + ` NOT NULL DEFAULT '${IMAGE_TYPE.SVG}'
  );`;
  getLocalDB().run(sql);
};

const initAdditional = () => {
  const sql = `CREATE TABLE ${ADDITIONAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL,
    text VARCHAR(64) COLLATE NOCASE
  );`;
  getLocalDB().run(sql);
};

// TODO max\swidth 的含义是什么，补充说明下
const initText = () => {
  const sql = `CREATE TABLE ${TEXT_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 100,
    size INT DEFAULT 16,
    font VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL DEFAULT white,
    stroke VARCHAR(20) NOT NULL DEFAULT transparent,
    swidth INT DEFAULT 1,
    align VARCHAR(10) NOT NULL,
    direction VARCHAR(10) NOT NULL,
    blur REAL DEFAULT 0,
    degree REAL DEFAULT 0,
    senior INT DEFAULT 1
  );`;
  getLocalDB().run(sql);
};

const initLog = () => {
  const sql = `CREATE TABLE ${LOG_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromid CHAR(100) NOT NULL,
    text VARCHAR(200) NOT NULL,
    date Date
  );`;
  getLocalDB().run(sql);
};

export {
  initDB
};
