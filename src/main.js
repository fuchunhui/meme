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
  getSingleTable,
  SERIES_TABLE,
  FEATURE_TABLE
} from './db/index.js';
import { make } from './convert/make.js';
import { formatMenu, formatNull, formatHelp } from './convert/format.js';
import { send } from './service/index.js';
import {COMMAND_LIST} from './config/constant.js';

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

  const commands = getDataListByColumn(command, 'feature', SERIES_TABLE); // TODO 应更改为，先查询feature表，检测是否存在这样的内容
  // 然后，再判断属于哪种feature
  // command 判断是否大于2，是否返回列表，是否与参数
  // text 组合文本，带参数
  // image 组合图片，绘制带图片内容
  if (commands.length > 1) {
    const commandList = commands.map(item => item.title);
    if (params.length && commandList.includes(params[0])) {
      const singleList = getDataListByColumn(command, 'feature', FEATURE_TABLE);
      console.log('singleList: ', singleList);
      const {type, x, y, width, height} = singleList[0];
      
      if (type === 'TEXT') {
        const textData = getDataByColumn(params[0], 'title', SERIES_TABLE);
        if (textData.image) {
          const base64 = make(text, textData);
          send(toid, base64);
        }
      } else if (type === 'IMAGE') {
        // 图片的话，组合绘图
      }

      return;
    }

    const composeContent = formatMenu(commandList, command);
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
