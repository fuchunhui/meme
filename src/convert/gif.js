import {TextGif} from './textgif.js';
import {tempFile, removeImg} from './write.js';
import {convert} from './base64.js';

const makeGif = async (text, options) => {
  const {image, x, y, max, font, color, stroke, swidth, align, direction} = options;

  const gif = new TextGif({
    file_path: image,
    options: {x, y, max, font, color, stroke, swidth, align, direction}
  });

  // 改造 options，把 text 当成一个配置参数，传入到内部，不需要每次单独调用传递，默认空文本。
  // 通过监听 on frame 事件，在不同的帧索引，修改配置信息即可实现对文本的细节控制。

  // you dont have to manually handle this but you can if you want to record the time or something
  // gif.on('extraction complete', async () => {
  //   gif.textGif({
  //     text,
  //     write_path: 'path-top.gif'
  //   });
  // });

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
    text,
    write_path: filePath
  });

  const base64 = convert(filePath);

  removeImg(filePath);

  return Promise.resolve(base64);
};

export {
  makeGif
};
