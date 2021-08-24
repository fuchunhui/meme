import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn, deleteTable} from './src/db/index.js';
import {send} from './src/service/index.js'
import { make } from './src/convert/make.js';
import { getSize } from './src/convert/size.js';
import { parser } from './src/convert/parser.js';

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
// const newBasse = make('超级', data);

// send(newBasse);
console.log(getSize(base64Img));

// 解密串
const encryption = '';

console.log(parser(encryption));

// 根据不同的parser返回结果，走不同的流程。
// 空文本，返回命令行, 
// 否则 解析文本信息，按空格区分，前者是机器人命令，后面是文本内容。然后查询数据。
// { fromid: 'xx', toid: xx, command: '12345', text: '' }

// 策略
// command 为空 返回命令集合
// command 不为空 查询命令
// text 为空 返回原图
// text 不为空 合成

// 发送。

