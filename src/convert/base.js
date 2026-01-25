const LINE_HEIGHT = 1.2;

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

const fillText = (ctx, width, options) => {
  const {x, y, size, font, color, align, max, direction, blur = 0, degree = 0, stroke, swidth, content} = options;
  ctx.font = `${size}px ${font}` || '32px sans-serif';
  ctx.fillStyle = color || '#000000';
  if (blur) {
    ctx.filter = `blur(${blur}px)`;
  }
  ctx.textAlign = align || 'center';
  ctx.strokeStyle = stroke || 'transparent';
  ctx.lineWidth = swidth || 1;

  const maxWidth = max || width;
  const lines = _breakLines(content, maxWidth, ctx);
  lines.forEach((item, index) => {
    let offset = 0;
    if (direction === 'down') {
      offset = index;
    } else if (direction === 'center') {
      offset = index - (lines.length - 1) / 2;
    } else { // up
      offset = index - (lines.length - 1);
    }

    ctx.save();
    if (degree) {
      ctx.translate(x, y + offset * size * LINE_HEIGHT);
      ctx.rotate(degree * Math.PI / 180);
      ctx.strokeText(item, 0, 0, maxWidth);
      ctx.fillText(item, 0, 0, maxWidth);
    } else {
      ctx.strokeText(item, x, y + offset * size * LINE_HEIGHT, maxWidth);
      ctx.fillText(item, x, y + offset * size * LINE_HEIGHT, maxWidth);
    }
    ctx.restore();
  });
};

export {
  fillText
};
