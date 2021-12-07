/**
 * @file 主控流程，负责整个消息的控制
 */

import { parser } from './convert/parser.js';
import {
  getTable,
  getDataByColumn,
  getDataListByColumn,
  getSpecialDataListByColumn,
  insertLog,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  FEATURE_TYPE
} from './db/index.js';
import { make, getFontSize } from './convert/make.js';
import { formatMenu, formatNull, formatHelp, formatError } from './convert/format.js';
import { send } from './service/index.js';
import { getBase64 } from './service/data.js';
import { COMMAND_LIST } from './config/constant.js';

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
  const {fromid, toid, command, text, params} = parser(encryption);

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
    return;
  }

  if (COMMAND_LIST.includes(command)) {
    let content = '';
    if (command === 'help') {
      content = formatHelp();
    } else if (command === 'special') { // 特殊节日、彩蛋命令
      content = '彩蛋or💣';
    }

    send(toid, content, 'MD');
    return;
  }

  const singleList = getDataListByColumn(command, 'feature', FEATURE_TABLE);

  if (singleList.length) {
    const {type, sid, sname, tid} = singleList[0];
    const param = params.length ? params[0] : '';

    if (type === FEATURE_TYPE.COMMAND) {
      const commands = getDataListByColumn(command, 'feature', SERIES_TABLE);
      const commandList = commands.map(item => item.title);
      if (param && commandList.includes(param)) {
        const commandData = getDataByColumn(param, 'title', SERIES_TABLE);
        const base64 = make(text, commandData);
        send(toid, base64);
        return;
      }
      const composeContent = formatMenu(commandList, command);
      send(toid, composeContent, 'MD');
      return;
    }

    const imageData = getDataByColumn(sid, 'mid', sname);
    if (!imageData.image) {
      const content = formatError();
      send(toid, content, 'TEXT');

      insertLog({
        fromid,
        text: `miss ${sid} in ${sname}. title is [${command}].`,
        date: new Date()
      });
      return;
    }

    if (param) {
      let options = {};
      let imageBase64 = '';

      if (type === FEATURE_TYPE.TEXT) {
        const textStyles = getDataListByColumn(tid, 'mid', TEXT_TABLE);
        if (textStyles.length) {
          options = textStyles[0];
        }
      }

      if (type === FEATURE_TYPE.IMAGE) {
        const {x, y, width, height, ipath} = singleList[0];
        imageBase64 = getBase64(ipath, param);

        if (imageBase64) {
          options = {
            image: imageBase64,
            x,
            y,
            width,
            height
          }
        } else {
          const {font, color, direction} = imageData;
          options = {
            x: x + width / 2,
            y: y + getFontSize(font),
            max: width,
            font,
            color,
            align: 'center',
            direction
          }
        }
      }

      const base64 = make(text, imageData, {
        picture: Boolean(imageBase64),
        text: param,
        options
      });
      send(toid, base64);
      return;
    }
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
    // TODO 小概率事件，20%
    // 随机触发其他机器人对话，否认自己的能力
    // 让其他机器人给图
    // 增加配置内容，开启和关闭

    insertLog({
      fromid,
      text: command,
      date: new Date()
    });
  }
};

export default control;
