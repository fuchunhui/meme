import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';
import { config } from '../config/index.js';

const DB_DIR = path.resolve(process.cwd(), 'public', 'db');

const SQL = await initSqlJs({
  locateFile: file => path.join(DB_DIR, file),
});

const DB_MAP = Object.create(null);

const loadDbFile = dbKey => {
  const filePath = path.join(DB_DIR, `${dbKey}.db`);
  const buffer = fs.readFileSync(filePath);
  const db = new SQL.Database(new Uint8Array(buffer));
  DB_MAP[dbKey] = { db, path: filePath };
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
  if (!DB_MAP[key]) {
    throw new Error(`Unknown db key: ${String(key)}`);
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
