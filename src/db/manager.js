import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';
import { config } from '../config/index.js';
import {
  STORY_TABLE,
  STATIC_ITEM_TABLE,
  STATIC_SEND_LOG_TABLE,
  STORY_TYPE,
} from './constant.js';

const DB_DIR = path.resolve(process.cwd(), 'public', 'db');

const SQL = await initSqlJs({
  locateFile: file => path.join(DB_DIR, file),
});

const DB_MAP = Object.create(null);

const getCreateTableSQL = (db, tableName) => {
  const rows = db.exec(`SELECT sql FROM sqlite_master WHERE type = 'table' AND name = '${tableName}';`);
  if (!rows.length || !rows[0].values.length) {
    return '';
  }

  return String(rows[0].values[0][0] || '');
};

const hasTable = (db, tableName) => {
  const rows = db.exec(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = '${tableName}';`);
  return rows.length > 0 && rows[0].values.length > 0;
};

const ensureStaticTables = db => {
  db.run(`CREATE TABLE IF NOT EXISTS ${STATIC_ITEM_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mid CHAR(20) NOT NULL,
    hash CHAR(32) NOT NULL,
    ext VARCHAR(10) NOT NULL DEFAULT 'png',
    tags VARCHAR(100) COLLATE NOCASE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mid) REFERENCES ${STORY_TABLE}(mid),
    UNIQUE(mid, hash)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS ${STATIC_SEND_LOG_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fromid CHAR(100) NOT NULL,
    mid CHAR(20) NOT NULL,
    item_id INT NOT NULL,
    date Date
  );`);
};

const migrateStoryTableForStatic = db => {
  const storyDDL = getCreateTableSQL(db, STORY_TABLE).toUpperCase();
  if (!storyDDL) {
    return false;
  }

  if (storyDDL.includes(`'${STORY_TYPE.STATIC}'`)) {
    return false;
  }

  db.run('BEGIN TRANSACTION;');
  try {
    db.run(`ALTER TABLE ${STORY_TABLE} RENAME TO ${STORY_TABLE}_OLD;`);
    db.run(`CREATE TABLE ${STORY_TABLE} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mid CHAR(20) NOT NULL UNIQUE,
      name VARCHAR(50) COLLATE NOCASE,
      md5 CHAR(32) NOT NULL,
      feature VARCHAR(100) COLLATE NOCASE,
      type VARCHAR(20) CHECK(type IN ('${STORY_TYPE.TEXT}', '${STORY_TYPE.GIF}', '${STORY_TYPE.STATIC}'))
        NOT NULL DEFAULT 'TEXT',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
    db.run(`INSERT INTO ${STORY_TABLE} (id, mid, name, md5, feature, type, created_at, updated_at)
      SELECT id, mid, name, md5, feature,
      CASE WHEN type IN ('${STORY_TYPE.TEXT}', '${STORY_TYPE.GIF}', '${STORY_TYPE.STATIC}') THEN type ELSE '${STORY_TYPE.TEXT}' END,
      created_at, updated_at
      FROM ${STORY_TABLE}_OLD;`);
    db.run(`DROP TABLE ${STORY_TABLE}_OLD;`);
    db.run('COMMIT;');
    return true;
  } catch (err) {
    db.run('ROLLBACK;');
    throw err;
  }
};

const migrateDbSchema = db => {
  let changed = false;

  if (hasTable(db, STORY_TABLE)) {
    changed = migrateStoryTableForStatic(db) || changed;
  }

  const hadStaticItem = hasTable(db, STATIC_ITEM_TABLE);
  const hadStaticSendLog = hasTable(db, STATIC_SEND_LOG_TABLE);
  ensureStaticTables(db);
  if (!hadStaticItem || !hadStaticSendLog) {
    changed = true;
  }

  return changed;
};

const loadDbFile = dbKey => {
  const filePath = path.join(DB_DIR, `${dbKey}.db`);
  
  // 如果文件不存在，跳过加载
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  const buffer = fs.readFileSync(filePath);
  const db = new SQL.Database(new Uint8Array(buffer));

  const changed = migrateDbSchema(db);
  if (changed) {
    const data = db.export();
    fs.writeFileSync(filePath, new Uint8Array(data));
  }

  DB_MAP[dbKey] = { db, path: filePath };
  return true;
};

// Always load default meme db
loadDbFile('meme');

// Load extra dbs from config (e.g. butter)
config.forEach(({ path: dbKey }) => {
  if (!dbKey || dbKey === 'meme') return;
  if (DB_MAP[dbKey]) return;
  loadDbFile(dbKey);
});

const assertDbKey = dbKey => {
  const key = dbKey || 'meme';
  
  // 如果数据库未加载，尝试加载
  if (!DB_MAP[key]) {
    const loaded = loadDbFile(key);
    if (!loaded) {
      throw new Error(`Unknown db key: ${String(key)}`);
    }
  }
  
  return key;
};

const getDB = (dbKey = 'meme') => {
  const key = assertDbKey(dbKey);
  return DB_MAP[key].db;
};

const writeDB = (dbKey = 'meme') => {
  const key = assertDbKey(dbKey);
  const data = DB_MAP[key].db.export();
  const buffer = new Uint8Array(data);
  fs.writeFileSync(DB_MAP[key].path, buffer);
};

export {
  getDB,
  writeDB,
};
