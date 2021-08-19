import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn} from './src/db/index.js';

// getTable();

const data = getDataByColumn('title', 'happy');
console.log(data);

// writeDB();

// initDB();
