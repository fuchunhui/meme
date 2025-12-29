/**
 * @file 主控流程，负责整个消息的控制
 */

import {createContext} from './convert/context.js';
import {
  getDataByColumn,
  getDataListByColumn,
  getColumnByTable,
  insertLog
} from './db/index.js';

import {
  STORY_TABLE,
  TEXT_TABLE,
  ADDITIONAL_TABLE,
  GIF_TABLE,
  STORY_TYPE, // FEATURE_TYPE
  IMAGE_TYPE
} from './db/constant.js';

import {make, makeImageMenu} from './convert/make.js';
import {getFontSize} from './convert/base.js';
import {makeGif} from './convert/gif.js';
import {
  formatAllMenu,
  formatMenu,
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
  normalImageMenu,
  gifMenu,
  getOptions,
  getBase64,
  getLatestMid
} from './service/data.js';

import {COMMAND_LIST} from './config/constant.js';

const control = ({fromid, toid, command, text, params, key, name}, ctx) => {
  if (command === '') { // 空命令，返回完整菜单
    const {normal, senior} = normalMenu(ctx);
    const content = formatAllMenu(name, normal, senior);
    send(key, toid, content, 'MD');

    return;
  }

  if (COMMAND_LIST.includes(command)) {
    let content = '';
    if (command === 'help') {
      content = formatHelp(ctx);
    } else if (command === 'image') {
      const imageList = normalImageMenu(ctx);
      const options = formatImageMenu(name);
      const base64 = makeImageMenu(imageList, options); // TODO 文件大小的检查，需要处理。
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
      content = '随机指令已下线，请使用其他命令。';
    }

    send(key, toid, content, 'MD');
    return;
  }

  // 从这里开始修改，根据 story 的类型，执行不同的动作 12.29

  const data = getDataByColumn(command, 'name', STORY_TABLE, ctx);
  console.info('story data: ', data);

  if (!data.md5) { // 未找到对应的表情包，返回提示信息
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
  }

  if (data.type === STORY_TYPE.TEXT) {
    let content = text;
    const base64 = make(content, data); // TODO data没有 image 内容，拼接进来处理
    send(key, toid, base64);
  } else if (data.type === STORY_TYPE.ADDITIONAL) {
    const additional = getColumnByTable(data.mid, 'mid', ADDITIONAL_TABLE, ctx);
    content += additional.text; // 补充的文本，后置处理

  } else if (data.type === STORY_TYPE.IMAGE) {
  } else if (data.type === STORY_TYPE.REPEAT) {
  } else if (data.type === STORY_TYPE.GIF) {
  }

  // 下面的逻辑待优化 12.29
  const singleList = getDataListByColumn(command, 'feature', FEATURE_TABLE, ctx);
  if (singleList.length) {
    const {type, sid, sname, tid} = singleList[0];
    let param = params.length ? params[0] : '';

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

  const gifList = getDataListByColumn(command, 'title', GIF_TABLE, ctx);
  if (gifList.length) {
    makeGif(text, gifList[0]).then(base64 => {
      send(key, toid, base64);
    });
    return;
  }

  insertLog({ // 日志调整为每次都记录
    fromid,
    text: command,
    date: new Date(),
    ctx
  });
};

const main = encryption => {
  const ctx = createContext(encryption);
  const {fromid, toid, command, text, params, key, name} = ctx;
  control({fromid, toid, command, text, params, key, name}, ctx);
};

export default main;
