/**
 * @file 主控流程，负责整个消息的控制
 */

import {createContext} from './convert/context.js';
import {
  getDataByColumn,
  STORY_TABLE,
  STORY_TYPE,
  insertLog,
  ELEMENT_TYPE
} from './db/index.js';

import {make, makeImageMenu, makeWithNumber} from './convert/make.js';
import {makeGif} from './convert/gif.js';
import {
  formatAllMenu,
  formatMenu,
  formatNull,
  formatHelp,
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
  getLatestMid
} from './service/data.js';

import {COMMAND_LIST} from './config/constant.js';
import { getNamedBase64Img } from './convert/write.js';
import { recommendMemeCommand } from './ai/recommend.js';

const generateAndSend = async ({ mid, type, md5 }, params, command, key, toid, ctx) => {
  const {image, children} = getOptions(mid, type, md5, ctx);
  children.forEach((child, index) => {
    const {type, options} = child;
    const text = params[index] || '';
    if (type === ELEMENT_TYPE.IMAGE) {
      options.image = getNamedBase64Img(options.ipath, text);
    } else {
      options.content = text + (options.content || '');
    }
  });

  let base64 = '';
  if (params.length === 0) {
    base64 = await makeWithNumber(image, children);
  } else {
    if (type === STORY_TYPE.GIF) {
      base64 = await makeGif(image, children);
    } else {
      base64 = await make(image, children);
    }
  }

  const base64Size = (base64.length * 3) / 4 - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
  if (base64Size > 1024 * 1024) {
    send(key, toid, `【${command}】生成图片过大，请尝试其他指令。当前大小：${(base64Size / 1024 / 1024).toFixed(2)} MB`, 'TEXT');
    return;
  }

  send(key, toid, base64);
};

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

  insertLog({ // 日志调整为每次都记录
    fromid,
    text: command,
    date: new Date(),
    ctx
  });

  const result = getDataByColumn(command, 'name', STORY_TABLE, ctx);
  if (!result) {
    const aiQuery = command.length > 50 ? command.slice(0, 50) : command;
    const aiResult = await recommendMemeCommand(aiQuery, ctx);
    console.log('AI 推荐结果: ', aiResult);
    const rec = aiResult.success ? aiResult.recommendation : null;

    if (rec?.confidence === 'HIGH' && rec.command) {
      const recResult = getDataByColumn(rec.command, 'name', STORY_TABLE, ctx);
      if (recResult) {
        await generateAndSend(recResult, rec.parameters, rec.command, key, toid, ctx);
        return;
      }
    }

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

  await generateAndSend(result, params, command, key, toid, ctx);
};

const main = encryption => {
  const ctx = createContext(encryption);
  control(ctx);
};

export default main;
