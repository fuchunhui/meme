/**
 * @file 主控流程，负责整个消息的控制
 */

import { parser } from './convert/parser.js';
import {
  getTable,
  getDataByColumn,
  getDataListByColumn,
  getSpecialDataListByColumn,
  insertLog
} from './db/index.js';
import { make } from './convert/make.js';
import { formatMenu, formatNull } from './convert/format.js';
import { send } from './service/index.js';
export * from './service/router.js';
export * from './export/backup.js';

const special = (command, toid, text) => {
  const commands = getSpecialDataListByColumn(command);
  const specialCommand = commands.length > 0;

  if (specialCommand) {
    const index = Math.floor(Math.random() * commands.length);
    const data = commands[index];
    if (data.image) {
      const base64 = make(text, data);
      send(toid, base64);
    }
  }

  return specialCommand;
};

const control = encryption => {
  const {fromid, toid, command, text} = parser(encryption);

  if (command === '') {
    const list = getTable();

    const keyMap = new Map();
    list.forEach(({title, feature}) => {
      let value = [title];
      if (keyMap.has(feature)) {
        value = [...keyMap.get(feature), title];
      }
      keyMap.set(feature, value);
    });

    const comList = [];
    keyMap.forEach((value, key) => {
      const title = value.length > 1 ? `${key}(${value.join(', ')})` : `${value}`;
      comList.push(title);
    });

    const content = formatMenu(comList);

    send(toid, content, 'MD');
  } else {
    const commands = getDataListByColumn(command, 'feature'); // 当成 feature，查询是否多个 feature
    if (commands.length > 1) {
      const commandList = commands.map(item => item.title);
      const composeContent = formatMenu(commandList, commands[0].feature);
      send(toid, composeContent, 'MD');
      return;
    }

    if (special(command, toid, text)) {
      return;
    }

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
