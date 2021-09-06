import { writeImg, make } from './src/convert/make.js';
import { getSize } from './src/convert/size.js';
import { initDB, getDataByColumn, getDataListByColumn, getTable } from './src/db/index.js';
import main from './src/main.js';

// initDB();

// const data = getDataByColumn('weekly2');
// console.log(getSize(data.image));

// const newBasse = make('超级', {
//   image: data.image,
//   x: 280,
//   y: 536,
//   font: '64px sans-serif',
//   color: 'white',
//   align: 'end',
//   max: 280
// });

// const a = getDataListByColumn('weekly');
// console.log(a)

// writeImg(newBasse);

main('') // 测试命令

export default encryption => {
  main(encryption);
};
