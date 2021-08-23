// canvas 合成图片
// 剪切图片，随机调整
// 输出base64
// 有趣的图片加密？？？

import * as fs from 'fs';
import pkg from 'canvas';
import { getSize } from './size.js';

const { createCanvas, Image } = pkg;
const NOT_SUPPORT = ['image/gif', 'image/bmp'];

const make = (base64Img, options) => {
  const parts = base64Img.split(';base64,');
  const type = parts[0].split(':').pop();
  console.log('type: ', type);

  if (NOT_SUPPORT.includes(type)) {
    return writeImg(base64Img);
  }

  let base64 = '';
  const {width, height} = getSize(base64Img);
  
  if (width && height) {
    const img = new Image();
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      // 解构options
      const {x, y, text, font, fillStyle, textAlign, maxWidth} = options;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.textAlign = textAlign;
      ctx.fillText(text, x, y, maxWidth);

      base64 = canvas.toDataURL(type);
      writeImg(base64); // test
    };
    img.onerror = err => {
      console.error(err);
    };
    img.src = base64Img;
  }
  return base64;
};

const writeImg = base64Img => {
  const parts = base64Img.split(';base64,');
  const base64Image = parts.pop();
  const type = parts.pop().split('/').pop();
  const fileName = `meme_${new Date().getTime()}`.padEnd(18, '0');
  fs.writeFileSync(`${fileName}.${type}`, base64Image, {encoding: 'base64'});
};

export {
  make
};
