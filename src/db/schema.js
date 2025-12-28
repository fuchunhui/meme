import {
  STORY_TABLE,
  GIF_TABLE,
  IMAGE_TABLE,
  ADDITIONAL_TABLE,
  TEXT_TABLE,
  LOG_TABLE,
  STORY_TYPE,
  IMAGE_TYPE,
} from './constant.js';

const TABLES = Object.freeze({
  STORY_TABLE,
  GIF_TABLE,
  IMAGE_TABLE,
  ADDITIONAL_TABLE,
  TEXT_TABLE,
  LOG_TABLE,
});

const isSafeIdentifier = value => typeof value === 'string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(value);

const assertSafeIdentifier = (value, label) => {
  if (!isSafeIdentifier(value)) {
    throw new Error(`Unsafe ${label}: ${String(value)}`);
  }
};

const assertSafeTableName = tableName => {
  const values = new Set(Object.values(TABLES));
  if (!values.has(tableName)) {
    throw new Error(`Unknown table: ${String(tableName)}`);
  }
};

const assertSafeColumnList = columns => {
  if (!Array.isArray(columns)) {
    throw new Error('columns must be an array');
  }
  columns.forEach(col => assertSafeIdentifier(col, 'column'));
};

export {
  TABLES,
  STORY_TABLE,
  GIF_TABLE,
  IMAGE_TABLE,
  ADDITIONAL_TABLE,
  TEXT_TABLE,
  LOG_TABLE,
  STORY_TYPE,
  IMAGE_TYPE,
  isSafeIdentifier,
  assertSafeIdentifier,
  assertSafeTableName,
  assertSafeColumnList,
};
