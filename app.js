import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn} from './src/db/index.js';
import {send} from './src/service/index.js'
import {getSize} from './src/convert/make.js';

// getTable();

// const data = getDataByColumn('title', '老实巴交'); // png
// const data = getDataByColumn('title', 'happy'); // jpeg
// const data = getDataByColumn('title', '太难了'); // jpg
const data = getDataByColumn('title', '晕倒'); // gif
// console.log(data);

// writeDB();

// initDB();

const base64Img = data.image;
// send(data.image);

console.log(getSize(base64Img));
