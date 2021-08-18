import './src/config/index.js';
import {insertTable, queryAllTables, getTable, writeDB, deleteTable} from './src/db/index.js';

// console.log(getTable());
// console.log(JSON.stringify(queryAllTables()));

insertTable({
  title: '123123',
  image: 'dasdasdasdasdasd',
  x: 100,
  y: 100
});
// insertTable({
//   title: '5555',
//   image: 'gggggg',
//   x: 10,
//   y: 20
// });

getTable();
deleteTable();

console.log('------------------------------------');
getTable();
writeDB();
