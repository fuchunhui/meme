/**
 * @file 主控流程，负责整个消息的控制
 */

import { parser } from './convert/parser.js';
import { getDataByColumn, getTable } from './db/index.js';
import { make } from './convert/make.js';
import { send } from './service/index.js';

const control = encryption => {
  // 开始你的表演
  const {toid, command, text} = parser(encryption);

  if (command === '') {
    console.log('命令查询');
    const list = getTable();
    // 格式化 返回
  } else {
    const data = getDataByColumn(command);
    if (data.image) {
      const base64 = make(text, data);
      send(base64, toid);
    }
  }
};

export default control;
