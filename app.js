import './src/config/index.js';
import { getSize } from './src/convert/size.js';
import { initDB, getDataByColumn, getColumnByTable } from './src/db/index.js';
import main from './src/main.js';

// initDB();

// const data = getDataByColumn('weekly'); // png
// console.log(getSize(data.image));

// const newBasse = make('超级', {
//   image: base64Img,
//   text: '超级', // 外参
//   x: 25,
//   y: 130,
//   font: '24px sans-serif',
//   color: 'black',
//   align: 'start',
//   max: 100
// });

const encryption = '';

// 外层server启动后，接受到消息。调起main.js 主控流程。
main(encryption);
