// 外层server启动后，接受到消息。调起main.js 主控流程。

/**
 * @file 主控流程，负责整个消息的控制
 */

import { parser } from './convert/parser.js';

const control = encryption => {
  console.log('接受到的请求参数: ', encryption);

  // 开始你的表演

  const {fromid, toid, command, text} = parser(encryption);

  if (command === '') {
    console.log('命令查询');
  } else {
    // 拼接
    // 查询命令，获取base64
    // 发送
  }

  // 根据不同的parser返回结果，走不同的流程。
  // 空文本，返回命令行, 
  // 否则 解析文本信息，按空格区分，前者是机器人命令，后面是文本内容。然后查询数据。
  // { fromid: 'xx', toid: xx, command: '12345', text: '' }

  // 策略
  // command 为空 返回命令集合
  // command 不为空 查询命令
  // text 为空 返回原图
  // text 不为空 合成

  // 发送。
};

export default control;
