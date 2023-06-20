import {initDB} from './src/db/init.js'; // eslint-disable-line
import main, {listen, backup} from './src/main.js';

// initDB();

// const b1 = '';
// main(b1); // 测试命令

const come = encryption => {
  main(encryption);
};

export {
  come,
  listen,
  backup
};
