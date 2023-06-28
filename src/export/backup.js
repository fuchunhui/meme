import path from 'path';
import fs from 'fs';
import {
  STORY_TABLE,
  TEXT_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  MYSTERY_TABLE,
  MATERIAL_TABLE,
  SPECIAL_TABLE,
  ADDITIONAL_TABLE,
  GIF_TABLE,
  getSingleTable
} from '../db/index.js';

const saveData = (targetFile, fileList) => {
  const data = 'export default ' + JSON.stringify(fileList) + ';\n';
  fs.writeFile(targetFile, data, 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
};

const saveSingle = (base, fileName, list) => {
  const targetFile = path.resolve(base, `${fileName}.js`);
  saveData(targetFile, list);
};

const backup = base => {
  saveSingle(base, 'story', getStoryData(STORY_TABLE));
  saveSingle(base, 'text', getTextData());
  saveSingle(base, 'series', getStoryData(SERIES_TABLE));
  saveSingle(base, 'feature', getFeatureData());
  saveSingle(base, 'mystery', getMysteryData());
  saveSingle(base, 'material', getMaterialData());
  saveSingle(base, 'special', getStoryData(SPECIAL_TABLE));
  saveSingle(base, 'additional', getAdditionalData());
  saveSingle(base, 'gif', getGifData());
};

const getStoryData = (tableName = STORY_TABLE) => {
  const list = getSingleTable(tableName);
  const result = list.map(({mid, title, feature, image, senior}) => {
    return {
      mid,
      title,
      feature,
      image,
      senior
    };
  });

  return result;
};

const getTextData = () => {
  const list = getSingleTable(TEXT_TABLE);
  const result = list.map(({mid, x, y, font, color, align, max, direction, blur, degree,
    stroke = 'transparent', swidth = 1}) => {
    return {
      mid,
      x,
      y,
      font,
      color,
      align,
      max,
      direction,
      blur,
      degree,
      stroke,
      swidth
    };
  });

  return result;
};

const getFeatureData = () => {
  const list = getSingleTable(FEATURE_TABLE);
  const result = list.map(({mid, feature, type, sid, sname, tid, x, y, width, height, ipath}) => {
    return {
      mid,
      feature,
      type,
      sid,
      sname,
      tid,
      x,
      y,
      width,
      height,
      ipath
    };
  });

  return result;
};

const getMaterialData = () => {
  const list = getSingleTable(MATERIAL_TABLE);
  const result = list.map(({mid, feature, title, image}) => {
    return {
      mid,
      feature,
      title,
      image
    };
  });

  return result;
};

const getMysteryData = () => {
  const list = getSingleTable(MYSTERY_TABLE);
  const result = list.map(({title, text, param}) => {
    return {
      title,
      text,
      param
    };
  });

  return result;
};

const getAdditionalData = () => {
  const list = getSingleTable(ADDITIONAL_TABLE);
  const result = list.map(({mid, text}) => {
    return {
      mid,
      text
    };
  });

  return result;
};

const getGifData = () => {
  const list = getSingleTable(GIF_TABLE);
  const result = list.map(({mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame}) => {
    return {mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame};
  });

  return result;
};

export {
  backup
};
