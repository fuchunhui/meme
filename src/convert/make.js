import pkg from 'canvas';
import {getSize} from './size.js';
import {fillText} from './base.js';

const {createCanvas, Image} = pkg;
const NOT_SUPPORT = ['image/gif', 'image/bmp'];

const extImg = new Image();
extImg.onerror = err => {
  console.error(err);
};

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
          const {image: eBase64, x: ex, y: ey, width: ewidth, height: eheight} = eOptions;
          extImg.onload = () => {
            ctx.drawImage(extImg, ex, ey, ewidth, eheight);
            base64 = canvas.toDataURL(type);
            return base64;
          };
          extImg.src = eBase64;
        } else {
          ctx.restore();
          fillText(ctx, width, eText, eOptions);
        }
      }
      base64 = canvas.toDataURL(type);
    };
    img.onerror = err => {
      console.error(err);
    };
    img.src = base64Img;
  }
  return base64;
};

const makeMenu = (images, options) => {
  const {normal: inor, senior: isen, series: iser} = images;
  const {normal, senior, series, title} = options;
  const data = [
    {
      title: normal,
      children: inor
    },
    {
      title: senior,
      children: isen
    },
    {
      title: series,
      children: iser
    }
  ];

  const gap = 10;
  const secondHeight = 30;
  const headHeight = title ? gap * 3 : 0;
  const dimension = 100;
  const times = 9;
  const padding = 5;

  const width = dimension * times + gap * (times + 1);
  const height = headHeight
    + data.length * secondHeight
    + (dimension + gap) * data.reduce((pre, current) => pre + Math.ceil(current.children.length / times), 0)
    + gap * 3;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  let x = gap;
  let y = 0;

  ctx.textBaseline = 'top';
  ctx.fillStyle = '#333333';
  if (title) {
    ctx.font = '30px sans-serif';
    ctx.fillText(title, x, y);
    y += headHeight;
  }

  data.forEach(({title, children}) => {
    ctx.font = '24px sans-serif';
    ctx.fillText(title, x, y);

    y += secondHeight + gap;

    children.forEach(({title: ctitle, image}, cidx) => {
      const img = new Image();

      const cx = x + (cidx % times) * (dimension + gap);
      const cy = y + Math.floor(cidx / times) * (dimension + gap);

      img.onload = () => {
        ctx.drawImage(img, cx, cy, dimension, dimension);

        ctx.save();
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#FF0000';
        ctx.textBaseline = 'bottom';
        ctx.fillText(ctitle, cx + padding, cy + dimension);

        ctx.restore();
      };
      img.src = image;
    });

    y += Math.ceil(children.length / times) * (dimension + gap);
  });

  const base64 = canvas.toDataURL();
  return base64;
};

export {
  make,
  makeMenu
};
