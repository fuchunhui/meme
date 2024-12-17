import {
  getTable,
  insertTable,
  updateTable,
  updateTextTable,
  getDataByColumn,
  getDataListByColumn,
  getColumnByTable,
  getSingleTable,
  updateFeatureTable,
  getNamedColumnFromTable,
  getRandom,
  updateAdditionalTable,
  updateGifTable,
  insertGifTable,
  updateGifBaseTable,
  STORY_TABLE,
  SPECIAL_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  FEATURE_TYPE,
  TEXT_TABLE,
  FEATURE_IMAGE_TYPE,
  MATERIAL_TABLE,
  ADDITIONAL_TABLE,
  GIF_TABLE
} from '../db/index.js';
import {emptySucess, sucess, error} from './ajax.js';
import {testFile, getFileName, getRandomPath} from '../convert/write.js';
import {convert} from '../convert/base64.js';
import {group, sortBykey, filterKeys} from '../utils/utils.js';
import {
  UPDATE_TEXT_FAIL,
  UPDATE_STORY_FAIL,
  CREATE_REPEAT_TITLE,
  UPDATE_ADDITIONAL_FAIL,
  UPDATE_GIF_FAIL,
  GET_FEATURE_FAIL
} from '../config/constant.js';

const COMMAND_ID = {
  [STORY_TABLE]: 'meme_common',
  [FEATURE_TABLE]: 'meme_feature',
  [GIF_TABLE]: 'meme_gif'
};

const COMMAND_TEXT = {
  [STORY_TABLE]: '常用',
  [FEATURE_TABLE]: '高级',
  [GIF_TABLE]: '动图'
};

const COMMAND_TYPE = {
  [STORY_TABLE]: STORY_TABLE,
  [SPECIAL_TABLE]: SPECIAL_TABLE,
  [SERIES_TABLE]: SERIES_TABLE,
  [FEATURE_TABLE]: FEATURE_TABLE,
  [GIF_TABLE]: GIF_TABLE
};

const normalMenu = ctx => {
  const list = getTable(STORY_TABLE, false, ctx);
  return list.filter(item => item.senior === 0 || item.senior === 2).map(item => item.title);
};

const seniorMenu = ctx => {
  const list = getSingleTable(FEATURE_TABLE, ctx);
  return list.filter(item => item.type !== FEATURE_TYPE.COMMAND).map(item => item.feature);
};

const seriesMenu = ctx => {
  const list = getTable(SERIES_TABLE, false, ctx);
  const map = new Map();
  if (list.length) {
    list.forEach(({title, feature}) => {
      let value = [title];
      if (map.has(feature)) {
        value = [...map.get(feature), ...value];
      }
      map.set(feature, value);
    });
  }
  return map;
};

const imageMenu = ctx => {
  const list = getTable(STORY_TABLE, false, ctx);
  const [normal, senior] = group(list, story => story.senior === 0 || story.senior === 2);

  const series = getTable(SERIES_TABLE, false, ctx);
  series.forEach(item => item.title = `${item.feature} ${item.title}`);
  sortBykey(series, 'title');

  return {
    normal: filterKeys(normal),
    senior: filterKeys(senior),
    series: filterKeys(series)
  };
};

const gifMenu = ctx => {
  const list = getTable(GIF_TABLE, false, ctx);
  return list.map(item => item.title);
};

const _getStory = (target = [], ctx) => {
  const list = getTable(STORY_TABLE, false, ctx);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    target.push({
      id: COMMAND_ID[STORY_TABLE],
      text: COMMAND_TEXT[STORY_TABLE],
      type: COMMAND_TYPE[STORY_TABLE],
      children
    });
  }
};

const _getGif = (target = [], ctx) => {
  const list = getSingleTable(GIF_TABLE, ctx);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    target.push({
      id: COMMAND_ID[GIF_TABLE],
      text: COMMAND_TEXT[GIF_TABLE],
      type: COMMAND_TYPE[GIF_TABLE],
      children
    });
  }
};

const _getFeature = (target = [], ctx) => {
  const singleList = getSingleTable(FEATURE_TABLE, ctx);
  if (singleList.length) {
    const children = [];
    singleList.length && singleList.forEach(({mid, feature, type}) => {
      if (type === FEATURE_TYPE.COMMAND) {
        return;
      }
      let cell = {
        mid,
        title: feature,
        type
      };
      children.push(cell);
    });

    target.push({
      id: COMMAND_ID[FEATURE_TABLE],
      text: COMMAND_TEXT[FEATURE_TABLE],
      type: COMMAND_TYPE[FEATURE_TABLE],
      children
    });
  }
};

const _getSeries = (tabName = SERIES_TABLE, target = [], ctx) => {
  const list = getTable(tabName, false, ctx);
  if (list.length) {
    const map = new Map();
    list.forEach(({mid, title, feature}) => {
      let value = [{
        mid,
        title
      }];
      if (map.has(feature)) {
        value = [...map.get(feature), ...value];
      }
      map.set(feature, value);
    });

    map.forEach((value, key) => {
      target.push({
        id: key,
        text: key,
        type: COMMAND_TYPE[tabName],
        children: value
      });
    });
  }
};

const getCatalog = ctx => {
  const result = [];

  _getGif(result, ctx);
  _getStory(result, ctx);
  _getFeature(result, ctx);
  _getSeries(SERIES_TABLE, result, ctx);
  _getSeries(SPECIAL_TABLE, result, ctx);

  return result;
};

const open = (mid, type, ctx) => {
  const tabName = COMMAND_TYPE[type];
  const data = getDataByColumn(mid, 'mid', tabName, ctx);
  const {title, feature, image, senior, x, y, max, font, color, align, direction, blur, degree, stroke, swidth} = data;

  return {mid, title, feature, image, senior, x, y, max, font, color, align, direction, blur, degree, stroke, swidth};
};

const create = (options, ctx) => {
  const result = checkRepeat(options.title, ctx);
  if (result) {
    return result;
  }

  const data = insertTable(options, true, STORY_TABLE, ctx);
  if (data.error) {
    return error(data.data, UPDATE_TEXT_FAIL);
  }

  return sucess({
    mid: data.data
  });
};

const update = (options, ctx) => {
  const data = updateTable(options, STORY_TABLE, ctx);
  if (data) {
    return error(data, UPDATE_STORY_FAIL);
  }
  return emptySucess();
};

const updateText = (options, ctx) => {
  const data = updateTextTable(options, ctx);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
};

const openFeature = (mid, ctx) => {
  const featureList = getDataListByColumn(mid, 'mid', FEATURE_TABLE, ctx);
  if (!featureList.length) {
    return error({
      mid
    }, GET_FEATURE_FAIL);
  }
  const {feature, type, sid, sname, tid, x, y, width, height, ipath} = featureList[0];
  const story = open(sid, sname, ctx);
  let cell = {
    mid,
    feature,
    type,
    story
  };

  if ([FEATURE_TYPE.TEXT, FEATURE_TYPE.REPEAT].includes(type)) {
    const textStyles = getDataListByColumn(tid, 'mid', TEXT_TABLE, ctx);
    cell.et = textStyles.length ? textStyles[0] : null;
  } else if (type === FEATURE_TYPE.IMAGE) {
    cell.ei = {x, y, width, height, ipath};
  }

  return sucess(cell);
};

const updateFeature = (options, ctx) => {
  const data = updateFeatureTable(options, ctx);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
};

const getImagePaths = () => {
  return Object.values(FEATURE_IMAGE_TYPE);
};

const getBase64 = (type, title, ctx) => {
  let imageBase64 = '';
  if (type === FEATURE_IMAGE_TYPE.DB) {
    const materialData = getDataListByColumn(title, 'title', MATERIAL_TABLE, ctx);
    imageBase64 = materialData.image || '';
  } else if (type === FEATURE_IMAGE_TYPE.RANDOM) {
    const filePath = getRandomPath();
    imageBase64 = convert(filePath);
  } else {
    const filePath = testFile(type.toLowerCase(), title);
    if (filePath) {
      imageBase64 = convert(filePath);
    }
  }

  return imageBase64;
};

const getMaterialCatalog = (type, ctx) => {
  // 根据不同的 type 查找不同的表内容
  let result = [];
  if (type === FEATURE_IMAGE_TYPE.DB) {
    result = getNamedColumnFromTable(MATERIAL_TABLE, ['mid', 'title'], ctx);
  } else {
    // 读取不同的物理目录
  }

  return result;
};

const getRandomImageName = (ipath, ctx) => {
  let content = '';
  if (ipath === FEATURE_IMAGE_TYPE.DB) {
    const {title} = getRandom(MATERIAL_TABLE, 'title', '', ctx);
    content = title;
  } else {
    content = getFileName(ipath.toLowerCase());
  }

  return content;
};

const openAdditional = (mid, ctx) => {
  const additionalList = getDataListByColumn(mid, 'mid', ADDITIONAL_TABLE, ctx);
  const {text} = additionalList[0];
  let cell = {
    mid,
    text
  };

  return sucess(cell);
};

const updateAdditional = (options, ctx) => {
  const data = updateAdditionalTable(options, ctx);
  if (data) {
    return error(data, UPDATE_ADDITIONAL_FAIL);
  }
  return emptySucess();
};

const openGif = (mid, ctx) => {
  const gifList = getDataListByColumn(mid, 'mid', GIF_TABLE, ctx);
  const {title, image, x, y, max, font, color, stroke, swidth, align, direction, frame} = gifList[0];
  const cell = {
    mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame
  };
  return sucess(cell);
};

const updateGif = (options, ctx) => {
  const data = updateGifTable(options, ctx);
  if (data) {
    return error(data, UPDATE_GIF_FAIL);
  }
  return emptySucess();
};

const checkRepeat = (title, ctx) => {
  const story = getDataByColumn(title, 'title', STORY_TABLE, ctx);
  const gif = getColumnByTable(title, 'title', GIF_TABLE, ctx);

  const singleList = getSingleTable(FEATURE_TABLE, ctx);
  const children = singleList.map(({mid, feature}) => {
    return {
      mid,
      title: feature
    };
  });

  if (story.mid || gif.mid || children.some(item => item.title === title)) {
    return error({
      title: title
    }, CREATE_REPEAT_TITLE);
  }
  return false;
};

const createGif = (options, ctx) => {
  const result = checkRepeat(options.title, ctx);
  if (result) {
    return result;
  }

  const data = insertGifTable(options, ctx);
  if (data.error) {
    return error(data.data, UPDATE_GIF_FAIL);
  }

  return sucess({
    mid: data.data
  });
};

const updateGifBase = (options, ctx) => {
  const data = updateGifBaseTable(options, ctx);
  if (data) {
    return error(data, UPDATE_GIF_FAIL);
  }
  return emptySucess();
};

const getLatestMid = (time, ctx) => {
  const midList = [];

  const storyList = getTable(STORY_TABLE, false, ctx);
  storyList.forEach(({mid, title}) => {
    midList.push({mid, title});
  });
  const featureList = getTable(FEATURE_TABLE, false, ctx);
  featureList.forEach(({mid, feature}) => {
    midList.push({mid, title: feature});
  });
  const gifList = getTable(GIF_TABLE, false, ctx);
  gifList.forEach(({mid, title}) => {
    midList.push({mid, title});
  });

  const result = [];
  midList.forEach(({mid, title}) => {
    if (mid.replace('meme_', '') >= time) {
      result.push(title);
    }
  });

  return Array.from(new Set(result));
};

export {
  normalMenu,
  seniorMenu,
  seriesMenu,
  imageMenu,
  getCatalog,
  open,
  create,
  update,
  updateText,
  openFeature,
  updateFeature,
  getImagePaths,
  getBase64,
  getMaterialCatalog,
  getRandomImageName,
  openAdditional,
  updateAdditional,
  openGif,
  updateGif,
  createGif,
  updateGifBase,
  gifMenu,
  getLatestMid
};
