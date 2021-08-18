import './src/config/index.js';
import {insert, queryAllTables, getTable} from './src/db/index.js';

// console.log(getTable());
// console.log(JSON.stringify(queryAllTables()));

// insert({
//   title: '123123',
//   image: 'dasdasdasdasdasd',
//   x: 100,
//   y: 100
// });
// insert({
//   title: '5555',
//   image: 'gggggg',
//   x: 10,
//   y: 20
// });

getTable();
