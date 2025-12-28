import { getDB, writeDB } from './manager.js';
import { assertSafeIdentifier, assertSafeTableName } from './schema.js';

const all = (sql, params = {}, ctx) => {
  const stmt = getDB(ctx?.path).prepare(sql);
  const rows = [];
  try {
    stmt.bind(params);
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    return rows;
  } finally {
    stmt.free();
  }
};

const get = (sql, params = {}, ctx) => {
  const stmt = getDB(ctx?.path).prepare(sql);
  try {
    stmt.bind(params);
    if (!stmt.step()) return null;
    return stmt.getAsObject();
  } finally {
    stmt.free();
  }
};

const run = (sql, params = {}, ctx, { flush = true } = {}) => {
  const stmt = getDB(ctx?.path).prepare(sql);
  try {
    stmt.run(params);
  } finally {
    stmt.free();
  }

  if (flush) {
    writeDB(ctx?.path);
  }
};

const queryAllTables = ctx => {
  return getDB(ctx?.path).exec('SELECT name, sql FROM sqlite_master;');
};

const getTable = (tableName, ctx) => {
  assertSafeTableName(tableName);
  return all(`SELECT * FROM ${tableName};`, {}, ctx);
};

const getDataByColumn = (value, column, tableName, ctx) => {
  assertSafeTableName(tableName);
  assertSafeIdentifier(column, 'column');
  return get(`SELECT * FROM ${tableName} WHERE ${column} = :val;`, { ':val': value }, ctx);
};

const getDataListByColumn = (value, column, tableName, ctx) => {
  assertSafeTableName(tableName);
  assertSafeIdentifier(column, 'column');
  return all(`SELECT * FROM ${tableName} WHERE ${column} = :val;`, { ':val': value }, ctx);
};

const getNamedColumnFromTable = (tableName, columns = [], ctx) => {
  assertSafeTableName(tableName);
  const columnSQL = columns?.length ? (columns.forEach(c => assertSafeIdentifier(c, 'column')), columns.join(', ')) : '*';
  return all(`SELECT ${columnSQL} FROM ${tableName};`, {}, ctx);
};

export {
  all,
  get,
  run,
  queryAllTables,
  getTable,
  getDataByColumn,
  getDataListByColumn,
  getNamedColumnFromTable,
};
