import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn} from './src/db/index.js';
import {send} from './src/service/index.js'

// getTable();

const data = getDataByColumn('title', '老实巴交');
// console.log(data);

// writeDB();

// initDB();

send(data.image);
