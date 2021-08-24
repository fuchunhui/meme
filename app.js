import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn, deleteTable} from './src/db/index.js';
import {send} from './src/service/index.js'
import { make } from './src/convert/make.js';
import { getSize } from './src/convert/size.js';

// getTable();

const data = getDataByColumn('title', '老实巴交'); // png
// const data = getDataByColumn('title', 'happy'); // jpeg
// const data = getDataByColumn('title', '太难了'); // jpg
// const data = getDataByColumn('title', '晕倒'); // gif
// const data = getDataByColumn('title', '安排'); // bmp
// console.log(data);

// initDB();

// deleteTable('te%');
// writeDB();

const base64Img = data.image;
// const newBasse = make('超级', {
//   image: base64Img,
//   text: '超级', // 外参
//   x: 25,
//   y: 130,
//   font: '24px sans-serif',
//   color: 'black',
//   // color: '#FF0000',
//   align: 'start',
//   max: 100
// });
const newBasse = make('超级', data);

// send(newBasse);
console.log(getSize(base64Img));


