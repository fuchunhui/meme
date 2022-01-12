/**
 * @file 主控流程，负责整个消息的控制
 */

import {parser} from './convert/parser.js';
import {
  getDataByColumn,
  getDataListByColumn,
  getSpecialDataListByColumn,
  insertLog,
  getRandom,
  STORY_TABLE,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  FEATURE_TYPE
} from './db/index.js';
import {make, getFontSize} from './convert/make.js';
import {
  formatAllMenu,
  formatSeriesMenu,
  formatNull,
  formatHelp,
  formatError,
  formatOther,
  formatGuide
} from './convert/format.js';
import {send} from './service/index.js';
import {
  normalMenu,
  seniorMenu,
  seriesMenu,
  getBase64,
  getRandomImageName
} from './service/data.js';
import {COMMAND_LIST, getRole} from './config/constant.js';

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

const random = () => {
  let command = '';
  let text = getRole();
  let params = [];

  const percent = Math.floor(Math.random() * 100);
  if (percent < 20) {
    const {title} = getRandom(STORY_TABLE, 'title', 'senior = 0');
    command = title;
  } else if (percent < 30) {
    const {feature, type, ipath} = getRandom(FEATURE_TABLE, ['feature', 'type', 'ipath']);

    let content = '';
    if (type === FEATURE_TYPE.COMMAND) {
      const {title} = getRandom(SERIES_TABLE, 'title', `feature = '${feature}'`);
      content = title;
    } else if (type === FEATURE_TYPE.IMAGE) {
      content = getRandomImageName(ipath);
    } else {
      content = getRole();
    }
    params = [content];
  } else if (percent < 50) {
    const {title, text: _randomText, param} = getRandom();
    command = title;
    text = _randomText;
    if (param) {
      params.push(param);
    }
  } else {
    return {mystery: true};
  }

  return {
    command,
    text,
    params
  };
};

const control = ({fromid, toid, command, text, params}) => {
  if (command === '') {
    const storyList = normalMenu();
    const seniorList = seniorMenu();
    const seriesMap = seriesMenu();

    // TODO 随机返回 Image 的菜单示意图
    const content = formatAllMenu(storyList, seniorList, seriesMap);
    send(toid, content, 'MD');

    return;
  }

  if (COMMAND_LIST.includes(command)) {
    let content = '';
    if (command === 'help') {
      content = formatHelp();
    } else if (command === 'special') { // 特殊节日、彩蛋命令
      content = '彩蛋or💣';
    } else if (command === '*') {
      const {command, text, params, mystery} = random();
      if (mystery) {
        const base64 = getBase64('RANDOM');
        send(toid, base64);
      } else {
        control({fromid, toid, command, text, params});
      }
      return;
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
      const composeContent = formatSeriesMenu(commandList, command);
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
          };
        } else {
          const {font, color, direction, blur} = imageData;
          options = {
            x: x + width / 2,
            y: y + getFontSize(font),
            max: width,
            font,
            color,
            align: 'center',
            direction,
            blur
          };

          insertLog({
            fromid,
            text: `[${command}], missing [${param}].`,
            date: new Date()
          });
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
    let content = '';
    let messagesType = 'TEXT';
    const percent = Math.floor(Math.random() * 100);
    if (percent < 20) {
      content = formatOther();
    } else if (percent < 40) {
      content = formatGuide();
      messagesType = 'MD';
    } else {
      content = formatNull();
    }

    send(toid, content, messagesType);

    insertLog({
      fromid,
      text: command,
      date: new Date()
    });
  }
};

const main = encryption => {
  const {fromid, toid, command, text, params} = parser(encryption);
  control({fromid, toid, command, text, params});
};

export default main;
