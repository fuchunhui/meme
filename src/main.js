/**
 * @file 主控流程，负责整个消息的控制
 */

import {parser} from './convert/parser.js';
import {
  getDataByColumn,
  getDataListByColumn,
  getSpecialDataListByColumn,
  getColumnByTable,
  insertLog,
  getRandom,
  STORY_TABLE,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  ADDITIONAL_TABLE,
  FEATURE_TYPE
} from './db/index.js';
import {make, getFontSize, makeMenu} from './convert/make.js';
import {
  formatAllMenu,
  formatSeriesMenu,
  formatNull,
  formatHelp,
  formatError,
  formatOther,
  formatGuide,
  formatImageMenu
} from './convert/format.js';
import {send} from './service/index.js';
import {
  normalMenu,
  seniorMenu,
  seriesMenu,
  imageMenu,
  getBase64,
  getRandomImageName
} from './service/data.js';
import {COMMAND_LIST, getRole} from './config/constant.js';
import {getConfig} from './config/index.js';

export * from './service/router.js';
export * from './export/backup.js';

const special = (command, key, toid, text) => {
  const commands = getSpecialDataListByColumn(command);
  const specialCommand = commands.length > 0;

  if (specialCommand) {
    const index = Math.floor(Math.random() * commands.length);
    const data = commands[index];
    if (data.image) {
      const base64 = make(text, data);
      send(key, toid, base64);
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

const control = ({fromid, toid, command, text, params, key}) => {
  const name = getConfig(key).name;
  if (command === '') {
    const storyList = normalMenu();
    const seniorList = seniorMenu();
    const seriesMap = seriesMenu();

    const content = formatAllMenu(name, storyList, seniorList, seriesMap);
    send(key, toid, content, 'MD');

    return;
  }

  if (COMMAND_LIST.includes(command)) {
    let content = '';
    if (command === 'help') {
      content = formatHelp(name);
    } else if (command === 'image') {
      // 当前每次600ms 左右，根据实际情况，考虑是否优化为每天生成一次固定菜单。
      const imageList = imageMenu();
      const options = formatImageMenu(name);

      const base64 = makeMenu(imageList, options);
      send(key, toid, base64);
      return;
    } else if (command === 'special') { // 特殊节日、彩蛋命令
      content = '彩蛋or💣';
    } else if (command === '*') {
      const {command, text, params, mystery} = random();
      if (mystery) {
        const base64 = getBase64('RANDOM');
        send(key, toid, base64);
      } else {
        control({fromid, toid, command, text, params, key});
      }
      return;
    }

    send(key, toid, content, 'MD');
    return;
  }

  const singleList = getDataListByColumn(command, 'feature', FEATURE_TABLE);
  if (singleList.length) {
    const {type, sid, sname, tid} = singleList[0];
    let param = params.length ? params[0] : '';

    if (type === FEATURE_TYPE.COMMAND) {
      const commands = getDataListByColumn(command, 'feature', SERIES_TABLE);
      const commandList = commands.map(item => item.title);
      if (param && commandList.includes(param)) {
        const commandData = getDataByColumn(param, 'title', SERIES_TABLE);
        const base64 = make(text, commandData);
        send(key, toid, base64);
        return;
      }
      const composeContent = formatSeriesMenu(name, commandList, command);
      send(key, toid, composeContent, 'MD');
      return;
    }

    const imageData = getDataByColumn(sid, 'mid', sname);
    if (!imageData.image) {
      const content = formatError();
      send(key, toid, content, 'TEXT');

      insertLog({
        fromid,
        text: `miss ${sid} in ${sname}. title is [${command}].`,
        date: new Date()
      });
      return;
    }

    if (type === FEATURE_TYPE.REPEAT && !param) {
      param = text;
    }

    if (param) {
      let options = {};
      let imageBase64 = '';

      if ([FEATURE_TYPE.TEXT, FEATURE_TYPE.REPEAT].includes(type)) {
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
          const {font, color, direction, blur, degree} = imageData;
          options = {
            x: x + width / 2,
            y: y + getFontSize(font),
            max: width,
            font,
            color,
            align: 'center',
            direction,
            blur,
            degree
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
      send(key, toid, base64);
      return;
    }
  }

  if (special(command, key, toid, text)) {
    return;
  }

  const data = getDataByColumn(command);
  if (data.image) {
    let content = text;
    if (data.senior === 2) {
      const additional = getColumnByTable(data.mid, 'mid', ADDITIONAL_TABLE);
      content += additional.text; // 补充的文本，后置处理
    }

    const base64 = make(content, data);
    send(key, toid, base64);
  } else {
    let content = '';
    let messagesType = 'TEXT';
    const percent = Math.floor(Math.random() * 100);
    if (percent < 20) {
      content = formatOther();
    } else if (percent < 60) {
      content = formatGuide(name);
      messagesType = 'MD';
    } else {
      content = formatNull();
    }

    send(key, toid, content, messagesType);

    insertLog({
      fromid,
      text: command,
      date: new Date()
    });
  }
};

const main = encryption => {
  const {fromid, toid, command, text, params, key} = parser(encryption);
  control({fromid, toid, command, text, params, key});
};

export default main;
