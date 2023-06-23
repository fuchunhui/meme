import {getMid} from '../utils/keys.js';

import storyData from '../config/story.js';
import textData from '../config/text.js';
import seriesData from '../config/series.js';
import featureData from '../config/feature.js';
import mysteryData from '../config/mystery.js';
import specialData from '../config/special/index.js';
import materialData from '../config/material.js';
import additionalData from '../config/additional.js';
import gifData from '../config/gif.js';

import {
  STORY_TABLE,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  MYSTERY_TABLE,
  MATERIAL_TABLE,
  SPECIAL_TABLE,
  LOG_TABLE,
  ADDITIONAL_TABLE,
  GIF_TABLE,
  FEATURE_TYPE,
  FEATURE_SOURCE_NAME,
  FEATURE_IMAGE_TYPE,
  getDB,
  writeDB
} from './index.js';

const _resetDB = () => {
  const nameList = [
    STORY_TABLE,
    TEXT_TABLE,
    SERIES_TABLE,
    FEATURE_TABLE,
    MYSTERY_TABLE,
    MATERIAL_TABLE,
    SPECIAL_TABLE,
    LOG_TABLE,
    ADDITIONAL_TABLE,
    GIF_TABLE
  ];
  const sql = nameList.map(item => `DROP TABLE IF EXISTS ${item};`).join('');
  getDB().run(sql);
};

/**
 * 所有初始化脚本中，不负责数据库的写入，最后一步统一写入数据库。
 */
const initDB = () => {
  _resetDB();

  _initStory();
  _initText();
  _initSeries();
  _initFeature();
  _initMystery();
  _initSpecial();
  _initMaterial();
  _initLog();
  _initAdditional();
  _initGif();

  writeDB();
};

const _run = (sql, data) => {
  try {
    getDB().run(sql);
    return {
      error: false,
      data
    };
  } catch (error) {
    return {
      error: true,
      data: error.toString()
    };
  }
};

/**
 * 保留建表语句
 * 
 * senior含义说明
 *  0：常规 story 文本类型
 *  1：高级类型，包含 COMMAND、REPEAT、TEXT、IMAGE
 *  2：附加文本类型，APPEND
 *  3：动图类型，gif
 */
const _initStory = () => {
  const sql = `CREATE TABLE ${STORY_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    feature CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    senior INTEGER CHECK(senior IN (0, 1, 2, 3)) NOT NULL DEFAULT 0
  );`;
  getDB().run(sql);

  storyData.forEach(item => {
    _insertStory(item, STORY_TABLE);
  });
};

const _insertStory = (options, tableName = STORY_TABLE) => {
  const {mid: _mid, title, feature, image, senior = 0} = options;
  const mid = getMid(_mid);
  const statement = `INSERT INTO ${tableName} (mid, title, feature, image, senior) `
    + `VALUES ('${mid}', '${title}', '${feature}', '${image}', '${senior}');`;

  return _run(statement, mid);
};

const _initText = () => {
  const sql = `CREATE TABLE ${TEXT_TABLE} (
    tid INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 100,
    font CHAR(50) NOT NULL,
    color CHAR(20) NOT NULL,
    align CHAR(10) NOT NULL,
    direction CHAR(10) NOT NULL,
    blur REAL DEFAULT 0,
    degree REAL DEFAULT 0
  );`;
  getDB().run(sql);

  textData.forEach(({mid: _mid, x = 0, y = 0, max = 100, font = '32px sans-serif',
    color = 'black', align = 'start', direction = 'down', blur = 0, degree = 0}) => {
    const mid = getMid(_mid);
    const statement = `INSERT INTO ${TEXT_TABLE} (mid, x, y, max, font, color, align, direction, blur, degree) `
      + `VALUES ('${mid}', ${x}, ${y}, ${max}, '${font}', '${color}', '${align}', `
      + `'${direction}', ${blur}, ${degree});`;

    return _run(statement, mid);
  });
};

const _initSeries = () => {
  const sql = `CREATE TABLE ${SERIES_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    feature CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    senior INTEGER CHECK(senior IN (0, 1, 2, 3)) NOT NULL DEFAULT 0
  );`;

  getDB().run(sql);

  seriesData.forEach(item => {
    _insertStory(item, SERIES_TABLE);
  });
};

const _initFeature = () => {
  const sql = `CREATE TABLE ${FEATURE_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    feature CHAR(100) COLLATE NOCASE,
    type CHAR(50) CHECK(type IN ('${FEATURE_TYPE.COMMAND}', '${FEATURE_TYPE.IMAGE}', `
      + `'${FEATURE_TYPE.TEXT}', '${FEATURE_TYPE.REPEAT}')) NOT NULL DEFAULT '${FEATURE_TYPE.COMMAND}',
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
  getDB().run(sql);

  featureData.forEach(({mid: _mid, feature, type = 'COMMAND', sid = '', sname = FEATURE_SOURCE_NAME.COMMON,
    tid = '', x = 0, y = 0, width = 100, height = 100, ipath = FEATURE_IMAGE_TYPE.DB}) => {
    const mid = getMid(_mid);
    const statement = `INSERT INTO ${FEATURE_TABLE} (mid, feature, type, sid, sname, tid, x, y, width, height, ipath) `
      + `VALUES ('${mid}', '${feature}', '${type}', '${sid}', '${sname}', '${tid}', ${x}, ${y}, `
      + `${width}, ${height}, '${ipath}');`;
    return _run(statement, feature);
  });
};

const _initMystery = () => {
  const sql = `CREATE TABLE ${MYSTERY_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title CHAR(100) COLLATE NOCASE,
    text CHAR(200) NOT NULL,
    param CHAR(200) NOT NULL
  );`;
  getDB().run(sql);

  mysteryData.forEach(({title, text, param}) => {
    const statement = `INSERT INTO ${MYSTERY_TABLE} (title, text, param) VALUES ('${title}', '${text}', '${param}');`;
    return _run(statement, `Mystery: ${title}`);
  });
};

const _initSpecial = () => {
  const sql = `CREATE TABLE ${SPECIAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    feature CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    senior INTEGER CHECK(senior IN (0, 1, 2, 3)) NOT NULL DEFAULT 0
  );`;
  getDB().run(sql);

  specialData.forEach(item => {
    _insertStory(item, SPECIAL_TABLE);
  });
};

const _initMaterial = () => {
  const sql = `CREATE TABLE ${MATERIAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL
  );`;
  getDB().run(sql);

  materialData.forEach(({mid: _mid, title, image}) => {
    const mid = getMid(_mid);
    const statement = `INSERT INTO ${MATERIAL_TABLE} (mid, title, image) VALUES ('${mid}', '${title}', '${image}');`;
    return _run(statement, `Material: ${title}`);
  });
};

const _initLog = () => {
  const sql = `CREATE TABLE ${LOG_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromid CHAR(100) NOT NULL,
    text CHAR(200) NOT NULL,
    date Date
  );`;
  getDB().run(sql);
};

const _initAdditional = () => {
  const sql = `CREATE TABLE ${ADDITIONAL_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    text CHAR(100) COLLATE NOCASE
  );`;
  getDB().run(sql);

  additionalData.forEach(({mid: _mid, text}) => {
    const mid = getMid(_mid);
    const statement = `INSERT INTO ${ADDITIONAL_TABLE} (mid, text) VALUES ('${mid}', '${text}');`;

    return _run(statement, mid);
  });
};

const _initGif = () => {
  const sql = `CREATE TABLE ${GIF_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(50) NOT NULL,
    title CHAR(100) COLLATE NOCASE,
    image TEXT NOT NULL,
    x INT DEFAULT 0,
    y INT DEFAULT 0,
    max INT DEFAULT 100,
    font CHAR(50) NOT NULL,
    color CHAR(20) NOT NULL DEFAULT white,
    stroke CHAR(20) NOT NULL DEFAULT transparent,
    swidth INT DEFAULT 1,
    align CHAR(10) NOT NULL,
    direction CHAR(10) NOT NULL,
    frame CHAR(100) NOT NULL DEFAULT NORMAL
  );`;
  getDB().run(sql);

  gifData.forEach(({mid: _mid, title, image, x = 0, y = 0, max = 100, font = '32px sans-serif',
    color = 'black', stroke = 'white', swidth = 1, align = 'start', direction = 'down', frame = 'NORMAL'}) => {
    const mid = getMid(_mid);
    const statement = `INSERT INTO ${GIF_TABLE} `
      + `(mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame) `
      + `VALUES ('${mid}', '${title}', '${image}', ${x}, ${y}, ${max}, '${font}', '${color}', '${stroke}', `
      + `'${swidth}', '${align}', '${direction}', '${frame}');`;

    return _run(statement, mid);
  });
};


export {
  initDB
};
