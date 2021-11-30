import pkg from 'canvas';
import {getSize} from './size.js';
import {writeImg} from './write.js';

const { createCanvas, Image } = pkg;
const NOT_SUPPORT = ['image/gif', 'image/bmp'];
const LINE_HEIGHT = 1.2;

const make = (text, options, extensions) => {
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
      ctx.save();

      fillText(ctx, width, text, options);

      if (extensions) {
        const {picture, text: eText, options: eOptions} = extensions;
        if (picture) {
          // 画图
        } else {
          ctx.restore();
          fillText(ctx, width, eText, eOptions);
        }
      }

      base64 = canvas.toDataURL(type);
      writeImg(base64); // TODO
    };
    img.onerror = err => {
      console.error(err);
    };
    img.src = base64Img;
  }
  return base64;
};

const fillText = (ctx, width, text, options) => {
  const {x, y, font, color, align, max, direction} = options;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;

  const maxWidth = max || width;
  const fontSize = font.match(/(\d{1,3})px/) || ['', '32'];
  const size = Number(fontSize[1]);
  const lines = _breakLines(text, maxWidth, ctx);
  lines.forEach((item, index) => {
    const dy = direction === 'down' ? index : index - (lines.length - 1);
    ctx.fillText(item, x, y + dy * size * LINE_HEIGHT, maxWidth);
  });
};

const cook = () => {
  // 用于制作图片，修剪操作。
  // 图片的剪切，打补丁等操作。
};

const _findBreakPoint = (text, width, ctx) => {
  let min = 0;
  let max = text.length - 1;

  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    const startWidth = ctx.measureText(text.substring(0, middle)).width;
    const surplusWidth = ctx.measureText(text.substring(0, middle + 1)).width;

    if (startWidth <= width && surplusWidth > width) {
      return middle;
    }
    if (startWidth < width) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
};

/**
 * 按照给定的宽度，文本截取处理。需要提前设置好ctx的字体大小。
 * @param {string} text
 * @param {number} width
 * @param {CanvasRenderingContext2D} ctx
 * @returns 截取后的文本数组
 */
const _breakLines = (text, width, ctx) => {
  const lines = [];
  let breakPoint = 0;

  while ((breakPoint = _findBreakPoint(text, width, ctx)) !== -1) {
    lines.push(text.substring(0, breakPoint));
    text = text.substring(breakPoint);
  }

  if (text) {
    lines.push(text);
  }

  return lines;
};

export {
  make
};
