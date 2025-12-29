import { getDB, writeDB } from './manager.js';
import {
  queryAllTables,
  getTable,
  getDataByColumn,
  getDataListByColumn,
  getNamedColumnFromTable,
} from './query.js';

import { insertStoryTable, updateName } from './story.js';
import { insertTextTable, updateTextTable } from './text.js';
import { insertGifTable, updateGifTable } from './gif.js';
import { insertImageTable, updateImageTable } from './image.js';
import { insertAdditionalTable, updateAdditionalTable } from './additional.js';
import { insertLog } from './log.js';

export {
  // manager
  getDB,
  writeDB,

  // dao
  insertStoryTable,
  updateName,
  insertTextTable,
  updateTextTable,
  insertGifTable,
  updateGifTable,
  insertImageTable,
  updateImageTable,
  insertAdditionalTable,
  updateAdditionalTable,
  insertLog,

  // query helpers
  queryAllTables,
  getTable,
  getDataByColumn,
  getDataListByColumn,
  getNamedColumnFromTable,
};
