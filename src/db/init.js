import { getDB, writeDB } from './manager.js';
import {
  STORY_TABLE,
  ELEMENT_TABLE,
  TEXT_TABLE,
  IMAGE_TABLE,
  GIF_TABLE,
  ADDITIONAL_TABLE,
  LOG_TABLE,
  ELEMENT_TYPE,
  IMAGE_TYPE,
} from './constant.js';

let currentDB = '';

const setLocalDB = path => {
  currentDB = path || 'meme';
};

const getLocalDB = () => getDB(currentDB);

const resetDB = () => {
  const nameList = [
    STORY_TABLE,
    ELEMENT_TABLE,
    TEXT_TABLE,
    IMAGE_TABLE,
    GIF_TABLE,
    ADDITIONAL_TABLE,
    LOG_TABLE,
  ];
  const sql = nameList.map(item => `DROP TABLE IF EXISTS ${item};`).join('');
  getLocalDB().run(sql);
};

/**
 * 初始化数据库脚本
 * @param {String} path 本地数据库路径
 */
const initDB = path => {
  setLocalDB(path);
  resetDB();

  initStory();
  initElement();
  initText();
  initImage();
  initGif();
  initAdditional();
  initLog();

  writeDB(currentDB);
};

/**
 * 初始化 Story 表（顶层表，每个 Story 都在讲一个故事）
 * @description
 * 1. id: 主键，自增
 * 2. mid: 唯一标识
 * 3. name: 名称
 * 4. md5: 内容摘要
 * 5. feature: 特性描述，用于 AI 处理
 * 6. created_at: 创建时间
 * 7. updated_at: 更新时间
 */
const initStory = () => {
  const sql = `CREATE TABLE ${STORY_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL UNIQUE,
    name VARCHAR(50) COLLATE NOCASE,
    md5 CHAR(32) NOT NULL,
    feature VARCHAR(100) COLLATE NOCASE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
  getLocalDB().run(sql);
};

/**
 * 初始化 Element 表（中间层，管理所有类型的元素）
 * @description
 * 1. id: 主键，自增
 * 2. eid: 元素唯一标识
 * 3. story_id: 关联的 Story 表 mid
 * 4. type: 元素类型（TEXT, IMAGE, GIF, ADDITIONAL 等）
 * 5. layer: 图层顺序，数值越大越靠上
 * 6. visible: 是否可见
 */
const initElement = () => {
  const sql = `CREATE TABLE ${ELEMENT_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eid CHAR(20) NOT NULL UNIQUE,
    story_id CHAR(20) NOT NULL,
    type VARCHAR(20) CHECK(type IN ('${ELEMENT_TYPE.TEXT}', '${ELEMENT_TYPE.IMAGE}', `
      + `'${ELEMENT_TYPE.GIF}', '${ELEMENT_TYPE.ADDITIONAL}')) NOT NULL,
    layer INT DEFAULT 0,
    visible BOOLEAN DEFAULT 1,
    FOREIGN KEY (story_id) REFERENCES ${STORY_TABLE}(mid)
  );`;
  getLocalDB().run(sql);
};

/**
 * 初始化 Text 表（文本元素配置）
 * @description
 * 存储文本元素的所有样式属性
 * max: 文本最大宽度
 * swidth: 描边宽度
 */
const initText = () => {
  const sql = `CREATE TABLE ${TEXT_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eid CHAR(20) NOT NULL UNIQUE,
    content TEXT COLLATE NOCASE,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 100,
    size INT DEFAULT 16,
    font VARCHAR(50) NOT NULL DEFAULT 'sans-serif',
    color VARCHAR(20) NOT NULL DEFAULT 'white',
    stroke VARCHAR(20) NOT NULL DEFAULT 'transparent',
    swidth INT DEFAULT 1,
    align VARCHAR(10) NOT NULL DEFAULT 'start',
    direction VARCHAR(10) NOT NULL DEFAULT 'down',
    blur REAL DEFAULT 0,
    degree REAL DEFAULT 0,
    senior INT DEFAULT 1,
    FOREIGN KEY (eid) REFERENCES ${ELEMENT_TABLE}(eid)
  );`;
  getLocalDB().run(sql);
};

/**
 * 初始化 Image 表（图片元素配置）
 * @description 存储图片元素的位置和路径信息
 */
const initImage = () => {
  const sql = `CREATE TABLE ${IMAGE_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eid CHAR(20) NOT NULL UNIQUE,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    width INT DEFAULT 100,
    height INT DEFAULT 100,
    ipath VARCHAR(16) CHECK(ipath IN ('${IMAGE_TYPE.DB}', '${IMAGE_TYPE.SVG}', '${IMAGE_TYPE.PNG}'))`
      + ` NOT NULL DEFAULT '${IMAGE_TYPE.SVG}',
    FOREIGN KEY (eid) REFERENCES ${ELEMENT_TABLE}(eid)
  );`;
  getLocalDB().run(sql);
};

/**
 * 初始化 Gif 表（动图元素配置）
 * @description 存储动图元素的帧配置信息
 */
const initGif = () => {
  const sql = `CREATE TABLE ${GIF_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eid CHAR(20) NOT NULL UNIQUE,
    frame VARCHAR(32) NOT NULL DEFAULT 'NORMAL',
    FOREIGN KEY (eid) REFERENCES ${ELEMENT_TABLE}(eid)
  );`;
  getLocalDB().run(sql);
};

/**
 * 初始化 Additional 表（附加信息元素配置）
 * @description 存储附加的文本信息，用于特殊场景
 */
const initAdditional = () => {
  const sql = `CREATE TABLE ${ADDITIONAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eid CHAR(20) NOT NULL UNIQUE,
    text VARCHAR(200) COLLATE NOCASE,
    FOREIGN KEY (eid) REFERENCES ${ELEMENT_TABLE}(eid)
  );`;
  getLocalDB().run(sql);
};

/**
 * 初始化 Log 表
 * @description 存储日志信息
 */
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
