import pkg from 'canvas';
import {getSize} from './size.js';
import {fillText, fillNumberText} from './base.js';
import { ELEMENT_TYPE } from '../db/index.js';

const {createCanvas, Image} = pkg;

const make = (image, children) => {
  const {width, height} = getSize(image);

  if (!width || !height) {
    return Promise.resolve(image);
  }

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      ctx.drawImage(img, 0, 0);

      // 处理所有子元素，等待图片类型的加载完成
      const childPromises = children.map(child => {
        return new Promise((childResolve) => {
          const {type, options} = child;
          if (type === ELEMENT_TYPE.TEXT) {
            fillText(ctx, width, options);
            childResolve();
          } else if (type === ELEMENT_TYPE.IMAGE) {
            const {x, y, width: w, height: h, image} = options;
            if (!image) {
              childResolve();
              return;
            }
            const eimg = new Image();
            eimg.onload = () => {
              ctx.drawImage(eimg, x, y, w, h);
              childResolve();
            };
            eimg.onerror = () => childResolve(); // 失败也继续
            eimg.src = image;
          } else {
            childResolve();
          }
        });
      });

      await Promise.all(childPromises);
      resolve(canvas.toDataURL());
    };

    img.onerror = err => {
      console.error(err);
      reject(err);
    };
    img.src = image;
  });
};

const makeImageMenu = (images, options) => {
  const {normal: inor, senior: isen} = images;
  const {normal, senior, title} = options;
  const data = [
    {
      title: normal,
      children: inor
    }
  ];
  if (isen.length) {
    data.push({
      title: senior,
      children: isen
    });
  }

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

  return new Promise((resolve) => {
    const imagePromises = [];

    data.forEach(({title, children}) => {
      ctx.font = '24px sans-serif';
      ctx.fillText(title, x, y);

      y += secondHeight + gap;

      children.forEach(({name: ctitle, image}, cidx) => {
        const cx = x + (cidx % times) * (dimension + gap);
        const cy = y + Math.floor(cidx / times) * (dimension + gap);

        const promise = new Promise((imgResolve) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, cx, cy, dimension, dimension);

            ctx.save();
            ctx.font = '16px sans-serif';
            ctx.fillStyle = '#FF0000';
            ctx.textBaseline = 'bottom';
            ctx.fillText(ctitle, cx + padding, cy + dimension);

            ctx.restore();
            imgResolve();
          };
          img.onerror = () => imgResolve(); // 失败也继续
          img.src = image;
        });
        imagePromises.push(promise);
      });

      y += Math.ceil(children.length / times) * (dimension + gap);
    });

    Promise.all(imagePromises).then(() => {
      const base64 = canvas.toDataURL();
      resolve(base64);
    });
  });
};

const makeWithNumber = (image, children) => {
  const {width, height} = getSize(image);

  if (!width || !height) {
    return Promise.resolve(image);
  }

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      ctx.drawImage(img, 0, 0);

      const childPromises = children.map((child, index) => {
        return new Promise((childResolve) => {
          const {type, options} = child;
          if (type === ELEMENT_TYPE.TEXT) {
            const radius = options.size || 20;
            const x = options.x;
            const y = options.y;
            const align = options.align || 'center';
            const direction = options.direction || 'down';
            const number = index + 1;

            let drawX = x;
            if (align === 'start') {
              drawX = x + radius;
            } else if (align === 'end') {
              drawX = x - radius;
            }

            let drawY = y;
            drawY = y - radius / 4; // 微调位置，感觉更居中一些

            fillNumberText(ctx, {
              x: drawX,
              y: drawY,
              radius,
              number
            });
          } else if (type === ELEMENT_TYPE.IMAGE) {
            const {x, y, width: w, height: h} = options;
            const radius = Math.min(w, h) / 2;
            const centerX = x + w / 2;
            const centerY = y + h / 2;
            const number = index + 1;

            fillNumberText(ctx, {
              x: centerX,
              y: centerY,
              radius,
              number
            });
          }
          childResolve();
        });
      });

      await Promise.all(childPromises);
      resolve(canvas.toDataURL());
    };

    img.onerror = err => {
      console.error(err);
      reject(err);
    };
    img.src = image;
  });
};

export {
  make,
  makeImageMenu,
  makeWithNumber
};
