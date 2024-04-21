import {initDB} from './src/db/init.js'; // eslint-disable-line
import main, {listen, backup} from './src/main.js';

// initDB();

const come = encryption => {
  main(encryption);
};

export {
  come,
  listen,
  backup
};
