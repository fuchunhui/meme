import path from 'path';
import fs from 'fs';
import {
  getTable,
  getSingleTable,
  STORY_TABLE,
  SPECIAL_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  MATERIAL_TABLE,
  MYSTERY_TABLE
} from '../db/index.js';

const getData = tableName => {
  const list = getTable(tableName);
  const result = list.map(({mid, title, feature, image, senior,
    x, y, font, color, align, max, direction, blur, degree}) => {
    return {
      mid,
      title,
      feature,
      image,
      senior,
      x,
      y,
      font,
      color,
      align,
      max,
      direction,
      blur,
      degree
    };
  });

  return result;
};

const saveData = (targetFile, fileList) => {
  const data = 'export default ' + JSON.stringify(fileList) + ';\n';
  fs.writeFile(targetFile, data, 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
};

const save = (base, fileName, tableName) => {
  const list = getData(tableName);
  const targetFile = path.resolve(base, `${fileName}.js`);
  saveData(targetFile, list);
};

const backup = base => {
  save(base, 'common', STORY_TABLE);
  save(base, 'special', SPECIAL_TABLE);
  save(base, 'series', SERIES_TABLE);
  saveSingle(base, 'feature', getFeatureData);
  saveSingle(base, 'material', getMaterialData);
  saveSingle(base, 'mystery', getMysteryData);
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

const saveSingle = (base, fileName, funcName) => {
  const list = funcName();
  const targetFile = path.resolve(base, `${fileName}.js`);
  saveData(targetFile, list);
};

export {
  backup
};
