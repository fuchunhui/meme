import './src/config/index.js';
import {getTable, writeDB, initDB, getDataByColumn, deleteTable} from './src/db/index.js';
import main from './src/main.js';

// getTable();

// const data = getDataByColumn('title', '老实巴交'); // png
// const data = getDataByColumn('happy'); // jpeg
// const data = getDataByColumn('太难了'); // jpg
// const data = getDataByColumn('晕倒'); // gif
// const data = getDataByColumn('安排'); // bmp
// console.log(data);

// initDB();

// deleteTable('te%');
// writeDB();

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

const encryption = 'FoTe8-025JQd5OwGF768ANultyWrTdcpxdRZrXdF-qSX8NhnIVhB9g6bxvwBDGi4h46IsCQvPkm8p3yUJgo3YcgQKFytHcLEx65w9cl1BWsutV6gd-_FRhIJaG_A1HtuGTRMZfisQoyYNqUgOv-XAF-A11oi0bdOPtL_f0N2Jy2u1aGLJqDZSMO6Se1HSJsTV127tNWVfVNUCoWlKgQ_F8uGkmnHSQrk4kiZc0RYXvLw9h_-3qcg5M9wNM9DofRWBArGGgAcaSX9mnSmyOW7R_eat29zxj4c42y1deXZZ9mhAmsc5p8mYVe-adrq3b4w2YQrVEoIUr8lxEQtue0BdpyQHxh5sbbFRNozzU7PGEEG28hqH2He59prt_UZDqz_G1SLcFX3vZ_By2hyeLjeXLP32RGQigWmAI72GBE7zA5Z8_gIIoU8W-9iqmeGuH_Iq8CBMI4krt7MUCp_iWzyf_lA9qUgIcc1jzxy_wn6q65mKfhOv3l8GDnn97dXwKYgz6sNel7ps9aDedpXWYkyqsEX08Kon2dK77cn7KXPo7et62OVEWwyX0moMLnWHTsahUrHk2JzIwRVXZx9dEKY_Ny0aA6FVPj6ZAWvvhvWKv_j81rZVxGzRIeJoXzm3uSksKJg59dOfOnRyKqU1E9Xvkv0kBh_4fyJxS8Pv0DJyuWG5jzGOxRZKvozkoeH2PP1ZwYSjB2qHaRqMvVbzHPk6B5HpshXgESgIWYSTMCMtan7fP8Ha_HhBYaoAW3P_JpmO8XexK66doHjY4vifIGNAavcTe-e2t9Xdr8WRiYpPWI';

// 外层server启动后，接受到消息。调起main.js 主控流程。
main(encryption);
