import pkg from 'canvas';
import { getSize } from './size.js';

const { createCanvas, Image } = pkg;
const NOT_SUPPORT = ['image/gif', 'image/bmp'];

const make = (text, options) => {
  const base64Img = options.image;
  const parts = base64Img.split(';base64,');
  const type = parts[0].split(':').pop();

  if (NOT_SUPPORT.includes(type) || text === '') {
    return base64Img;
  }

  let base64 = '';
  const {width, height} = getSize(base64Img);

  if (width && height) {
    const img = new Image();
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      const {x, y, font, color, align, max, direction} = options;
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.fillText(text, x, y, max || width);
      console.log('direction------>', direction);

      base64 = canvas.toDataURL(type);
    };
    img.onerror = err => {
      console.error(err);
    };
    img.src = base64Img;
  }
  return base64;
};

const cook = () => {
  // 用于制作图片，修剪操作。
  // 图片的剪切，打补丁等操作。
};

export {
  make
};
