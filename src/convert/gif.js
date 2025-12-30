import {TextGif} from './textgif.js';
import {tempFile, removeImg} from './write.js';
import {convert} from './base64.js';

const makeGif = async (image, options) => {
  const gif = new TextGif({
    file_path: image,
    options
  });

  // 通过监听 on frame 事件，在不同的帧索引，修改配置信息即可实现对文本的细节控制。
  // frame 预留，增加几种不同的监控状态，根据不同的值，按需增加。
  // gif.on('on frame', frameIndex => {
  //   if (frameIndex % 2 == 0) {
  //     gif.options.color = 'white';
  //   } else {
  //     gif.options.color = 'black';
  //   }
  // });

  // encoding the frames back into a gif
  // gif.on('progress', percentage => {
  //   console.log(percentage + '% encoding done :)');
  // });

  // gif.on('finished', () => {
  //   console.log('gif encoding finished!');
  // });

  const filePath = tempFile();
  await gif.textGif({
    write_path: filePath
  });

  const base64 = convert(filePath);
  removeImg(filePath);

  return Promise.resolve(base64);
};

export {
  makeGif
};
