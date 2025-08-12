/**
 * @file 主控流程，负责整个消息的控制
 */

import {createContext} from './convert/context.js';
import {
  getDataByColumn,
  getDataListByColumn,
  getSpecialDataListByColumn,
  getColumnByTable,
  insertLog,
  STORY_TABLE,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  ADDITIONAL_TABLE,
  FEATURE_TYPE,
  GIF_TABLE
} from './db/index.js';
import {make, makeMenu} from './convert/make.js';
import {getFontSize} from './convert/base.js';
import {makeGif} from './convert/gif.js';
import {
  formatAllMenu,
  formatMenu,
  formatSeriesMenu,
  formatNull,
  formatHelp,
  formatError,
  formatOther,
  formatGuide,
  formatImageMenu,
  formatNewsMenu
} from './convert/format.js';
import {send} from './service/index.js';
import {
  normalMenu,
  seniorMenu,
  seriesMenu,
  imageMenu,
  getBase64,
  gifMenu,
  getLatestMid
} from './service/data.js';

import {COMMAND_LIST} from './config/constant.js';

export * from './service/router.js';

const special = (command, key, toid, text, ctx) => {
  const commands = getSpecialDataListByColumn(command, 'feature', ctx);
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

const control = ({fromid, toid, command, text, params, key, name}, ctx) => {
  if (command === '') {
    const storyList = normalMenu(ctx);
    const seniorList = seniorMenu(ctx);
    const seriesMap = seriesMenu(ctx);
    const gifList = gifMenu(ctx); // 与 story 菜单和在一起

    const content = formatAllMenu(name, storyList.concat(gifList), seniorList, seriesMap);
    send(key, toid, content, 'MD');

    return;
  }

  if (COMMAND_LIST.includes(command)) {
    let content = '';
    if (command === 'help') {
      content = formatHelp(ctx);
    } else if (command === 'image') {
      // 当前每次 600ms 左右，根据实际情况，考虑是否优化为每天生成一次固定菜单。
      const imageList = imageMenu(ctx);
      const options = formatImageMenu(name);

      const base64 = makeMenu(imageList, options);
      send(key, toid, base64);
      return;
    } else if (command === 'special') { // 特殊节日、彩蛋命令
      content = '彩蛋or💣';
    } else if (command === 'gif') { // gif 菜单
      content = formatMenu(gifMenu(ctx), 'gif 动图菜单');
    } else if (command === 'news') {
      const duration = new Date().getTime() - 30 * 24 * 60 * 60 * 1000; // 统计近一个月数据
      const commandList = getLatestMid(duration, ctx);
      content = formatNewsMenu(commandList);
    } else if (command === '*') {
      console.log('随机操作已下线');
    }

    send(key, toid, content, 'MD');
    return;
  }

  const singleList = getDataListByColumn(command, 'feature', FEATURE_TABLE, ctx);
  if (singleList.length) {
    const {type, sid, sname, tid} = singleList[0];
    let param = params.length ? params[0] : '';

    if (type === FEATURE_TYPE.COMMAND) {
      const commands = getDataListByColumn(command, 'feature', SERIES_TABLE, ctx);
      const commandList = commands.map(item => item.title);
      if (param && commandList.includes(param)) {
        const commandData = getDataByColumn(param, 'title', SERIES_TABLE, ctx);
        const base64 = make(text, commandData);
        send(key, toid, base64);
        return;
      }
      const composeContent = formatSeriesMenu(name, commandList, command);
      send(key, toid, composeContent, 'MD');
      return;
    }

    const imageData = getDataByColumn(sid, 'mid', sname, ctx);
    if (!imageData.image) {
      const content = formatError();
      send(key, toid, content, 'TEXT');

      insertLog({
        fromid,
        text: `miss ${sid} in ${sname}. title is [${command}].`,
        date: new Date(),
        ctx
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
        const textStyles = getDataListByColumn(tid, 'mid', TEXT_TABLE, ctx);
        if (textStyles.length) {
          options = textStyles[0];
        }

        // param 和 text 互换，是为了保证，文本内容在前，参数在后。对应解析过程中，text 是取得最后的文本内容。
        const tempText = param;
        param = text;
        text = tempText;
      }

      if (type === FEATURE_TYPE.IMAGE) {
        const {x, y, width, height, ipath} = singleList[0];
        imageBase64 = getBase64(ipath, param, ctx);

        if (imageBase64) {
          options = {
            image: imageBase64,
            x,
            y,
            width,
            height
          };
        } else {
          const {font, color, direction, blur, degree, stroke, swidth} = imageData;
          options = {
            x: x + width / 2,
            y: y + getFontSize(font),
            max: width,
            font,
            color,
            align: 'center',
            direction,
            blur,
            degree,
            stroke,
            swidth
          };

          insertLog({
            fromid,
            text: `[${command}], missing [${param}].`,
            date: new Date(),
            ctx
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

  if (special(command, key, toid, text, ctx)) {
    return;
  }

  const gifList = getDataListByColumn(command, 'title', GIF_TABLE, ctx);
  if (gifList.length) {
    makeGif(text, gifList[0]).then(base64 => {
      send(key, toid, base64);
    });
    return;
  }

  const data = getDataByColumn(command, 'title', STORY_TABLE, ctx);
  if (data.image) {
    let content = text;
    if (data.senior === 2) {
      const additional = getColumnByTable(data.mid, 'mid', ADDITIONAL_TABLE, ctx);
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
      date: new Date(),
      ctx
    });
  }
};

const main = encryption => {
  const ctx = createContext(encryption);
  const {fromid, toid, command, text, params, key, name} = ctx;
  control({fromid, toid, command, text, params, key, name}, ctx);
};

export default main;
