/**
 * @file 主控流程，负责整个消息的控制
 */

import {createContext} from './convert/context.js';
import {
  getDataByColumn,
  STORY_TABLE,
  STORY_TYPE,
  insertLog
} from './db/index.js';

import {make, makeImageMenu} from './convert/make.js';
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
import { getNamedBase64Img } from './convert/write.js';

const control = async ctx => {
  const {fromid, toid, command, params, key, name} = ctx;
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
      const base64 = await makeImageMenu(imageList, options); // TODO 文件大小的检查，需要处理。
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

  const {mid, type, md5} = getDataByColumn(command, 'name', STORY_TABLE, ctx);
  console.info('story data: ', {mid, type, md5});

  insertLog({ // 日志调整为每次都记录
    fromid,
    text: command,
    date: new Date(),
    ctx
  });

  if (!md5) { // 未找到对应的表情包，返回提示信息
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
    return;
  }

  const {image, children} = getOptions(mid, type, md5, ctx); // 默认返回的顺序已经按照 layer 排序，TODO 确认一下
  children.forEach((child, index) => {
    const {type, more} = child;
    const text = params[index] || ''; // 这里按顺序取参数
    if (type === ELEMENT_TYPE.IMAGE) {
      more.image = getNamedBase64Img(more.ipath, text);
    } else { // TEXT
      more.content = text + (more.content || ''); // 追加文本内容
    }
  });

  let base64 = '';
  if (type === STORY_TYPE.GIF) {
    base64 = await makeGif(image, children);
  } else {
    base64 = await make(image, children);
  }

  send(key, toid, base64);
};

const main = encryption => {
  const ctx = createContext(encryption);
  control(ctx);
};

export default main;
