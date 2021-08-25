/**
 * @file 主控流程，负责整个消息的控制
 */

import { parser } from './convert/parser.js';
import { getDataByColumn, getTable, insertLog } from './db/index.js';
import { make } from './convert/make.js';
import { formatMenu, formatNull } from './convert/format.js';
import { send } from './service/index.js';

const control = encryption => {
  const {fromid, toid, command, text} = parser(encryption);

  if (command === '') {
    const list = getTable();
    const comList = list.map(item => item.title);
    const content = formatMenu(comList);

    send(toid, content, 'MD');
  } else {
    const data = getDataByColumn(command);
    if (data.image) {
      const base64 = make(text, data);
      send(toid, base64);
    } else {
      const content = formatNull();
      send(toid, content, 'TEXT');

      insertLog({
        fromid,
        text: command,
        date: new Date()
      });
    }
  }
};

export default control;
