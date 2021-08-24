import * as fs from 'fs';
import pkg from 'canvas';
import { getSize } from './size.js';

const { createCanvas, Image } = pkg;
const NOT_SUPPORT = ['image/gif', 'image/bmp'];

const make = (text, options) => {
  const base64Img = options.image;
  const parts = base64Img.split(';base64,');
  const type = parts[0].split(':').pop();

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

      const {x, y, font, color, align, max} = options;
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.fillText(text, x, y, max); // TODO if max 没有设置，为0如何处理。

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

const cook = () => {
  // 用于制作图片，修剪操作。
  // 图片的剪切，打补丁等操作。
};

export {
  make
};
