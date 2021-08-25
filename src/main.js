/**
 * @file 主控流程，负责整个消息的控制
 */

import { parser } from './convert/parser.js';
import { getDataByColumn, getTable } from './db/index.js';
import { make } from './convert/make.js';
import { formatMenu, formatNull } from './convert/format.js';
import { send } from './service/index.js';

const control = encryption => {
  // 开始你的表演
  const {fromid, toid, command, text} = parser(encryption);

  if (command === '') {
    console.log('命令查询');
    const list = getTable();
    const comList = list.map(item => item.title);
    console.log(comList);
    const content = formatMenu(comList);
    // send(toid, content, 'MD'); // 发送菜单
  } else {
    const data = getDataByColumn(command);
    if (data.image) {
      const base64 = make(text, data);
      send(toid, base64);
    } else {
      const content = formatNull();
      send(toid, content, 'TEXT');
      // TODO 日志存储记录
      // 无效内容表
      // fromid 时间 命令
    }
  }
};

export default control;
