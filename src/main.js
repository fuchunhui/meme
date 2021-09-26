/**
 * @file 主控流程，负责整个消息的控制
 */

export * from './service/router.js';
export * from './export/backup.js';

import {
  getTable
} from './db/index.js';

const control = () => {
  console.log('control');
};

export default control;
