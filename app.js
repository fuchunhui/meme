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

const encryption = 'FoTe8-025JQd5OwGF768ANultyWrTdcpxdRZrXdF-qSX8NhnIVhB9g6bxvwBDGi4h46IsCQvPkm8p3yUJgo3YcgQKFytHcLEx65w9cl1BWsutV6gd-_FRhIJaG_A1HtuGTRMZfisQoyYNqUgOv-XAF-A11oi0bdOPtL_f0N2Jy2u1aGLJqDZSMO6Se1HSJsTV127tNWVfVNUCoWlKgQ_F8uGkmnHSQrk4kiZc0RYXvLw9h_-3qcg5M9wNM9DofRWBArGGgAcaSX9mnSmyOW7R4Dwt_VNCfL2hZUktMA_O_mtIbDjcEAvEHPfbEPTEipPq477qXnzPLWyLrGvTmVs0ZyQHxh5sbbFRNozzU7PGEEG28hqH2He59prt_UZDqz_G1SLcFX3vZ_By2hyeLjeXLP32RGQigWmAI72GBE7zA5Z8_gIIoU8W-9iqmeGuH_Ib7BF1CPkMf77ZjoPpI9ZpkWxI9vdjdOZQGSx-rnjaPkYyNdfzyW__l7THkn6WhI1Euh47R1cOq7uUnXHmVpuK8EX08Kon2dK77cn7KXPo7et62OVEWwyX0moMLnWHTsahUrHk2JzIwRVXZx9dEKY_Ny0aA6FVPj6ZAWvvhvWKv_j81rZVxGzRIeJoXzm3uSksr4YRkyKsGKCkgsFxbjCRMucM9c2zWYha4TbyIA3jg5b4aBZhc7B7Opv9KhweJW05iwmDh3tPh3jCcixJVCX2R0fqXN2UaHQAuxE01to6DcEIZv_TxwIdeHlInvAjtrbF2Z85iFkb7RKDbdLyaeqaV_VPUm4zB7d8Ej6virAi-o';

// 外层server启动后，接受到消息。调起main.js 主控流程。
main(encryption);
