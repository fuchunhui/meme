import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn, deleteTable} from './src/db/index.js';
import {send} from './src/service/index.js'
import {getSize} from './src/convert/size.js';
import { make } from './src/convert/make.js';

// getTable();

// const data = getDataByColumn('title', '老实巴交'); // png
const data = getDataByColumn('title', 'happy'); // jpeg
// const data = getDataByColumn('title', '太难了'); // jpg
// const data = getDataByColumn('title', '晕倒'); // gif
// const data = getDataByColumn('title', '安排'); // bmp
// console.log(data);



// initDB();

deleteTable('te%');
getTable();

writeDB();

const base64Img = data.image;
// const newBasse = make(base64Img, {
//   text: '王这啊', // 外参
//   x: 92,
//   y: 248,
//   font: '32px sans-serif',
//   fillStyle: '#FF0000',
//   textAlign: 'end',
//   maxWidth: 100
// });
// send(base64Img);
// send(newBasse);

// console.log(getSize(base64Img));


