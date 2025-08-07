// import {initDB} from './src/db/init.js'; // eslint-disable-line
import main, {listen} from './src/main.js';

// initDB('meme'); // 初始化数据库，传入 path

const come = encryption => {
  main(encryption);
};

export {
  come,
  listen
};
