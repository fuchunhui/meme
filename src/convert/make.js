// canvas 合成图片
// 剪切图片，随机调整
// 输出base64
// 有趣的图片加密？？？

import * as fs from 'fs';
import pkg from 'canvas';
const { createCanvas, Image } = pkg;

import { getSize } from './size.js';

const writeImg = base64Img => {
  const parts = base64Img.split(';base64,');
  const base64Image = parts.pop();
  const type = parts.pop().split('/').pop();
  const fileName = `meme_${new Date().getTime()}`.padEnd(18, '0');
  fs.writeFileSync(`${fileName}.${type}`, base64Image, {encoding: 'base64'});
};

const make = base64Img => {
  let base = '';
  const {width, height} = getSize(base64Img);
  const canvas = createCanvas(width, height); // width, height
  const ctx = canvas.getContext('2d');
  if (width && height) {
    // test
    const parts = base64Img.split(';base64,');
    const base64Image = parts.pop();
    const type = parts.pop().split(':').pop();
    console.log('type: ', type);
    const img = new Image();
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fillText('start', 10, 10); // ok

      base = canvas.toDataURL(type);
      console.log(base.slice(0, 50));
      writeImg(base);
      // writeImg(base64Img);
    };
    img.onerror = err => {
      console.error(err);
    };
    img.src = base64Img;

  }
  return base;
};


export {
  make
};
