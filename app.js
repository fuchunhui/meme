import { initDB } from './src/db/index.js';
import main, {listen, backup} from './src/main.js';

// initDB();
// main('') // 测试命令

const come = encryption => {
  main(encryption);
};

export {
  come,
  listen,
  backup
};
