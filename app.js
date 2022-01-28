import {initDB} from './src/db/index.js';
import main, {listen, backup} from './src/main.js';

// initDB();

// const b1 = '';
// main(b7); // 测试命令

const come = encryption => {
  main(encryption);
};

export {
  come,
  listen,
  backup
};
