import crypto from 'crypto';
import {getMid} from '../utils/keys.js';
import {writeImg} from '../convert/write.js';

import {
  ELEMENT_TYPE,
  getDataListByColumn,
  STORY_TYPE,
  STORY_TABLE,
  createStory,
  getStoryByMid,
  getStoryByName,
  getAllStories,
  updateStory,
  createElement,
  getElementsByStoryId,
  createText,
  getTextByEid,
  updateText,
  createImage,
  getImageByEid,
  updateImage,
  createGif,
} from '../db/index.js';

import {emptySucess, sucess, error} from './ajax.js';
import {getBase64Img} from '../convert/write.js';
import {convert} from '../convert/base64.js';
import {group} from '../utils/utils.js';
import {
  CREATE_STORY_FAIL,
  UPDATE_TEXT_FAIL,
  UPDATE_NAME_FAIL,
  CREATE_REPEAT_NAME
} from '../config/constant.js';

const normalMenu = ctx => {
  const storyList = getAllStories(ctx).map(({mid, name, md5, type}) => ({mid, name, md5, type}));

  const countMap = {};
  storyList.forEach(story => {
    const elements = getElementsByStoryId(story.mid, ctx);
    countMap[story.mid] = elements.length;
  });
  
  const [normal, senior] = group(storyList, item => countMap[item.mid] === 1);
  return {
    normal,
    senior
  };
};

const gifMenu = ctx => {
  const gifStories = getDataListByColumn(STORY_TYPE.GIF, 'type', STORY_TABLE, ctx);
  return (gifStories || []).map(s => s.name);
};

const normalImageMenu = ctx => {
  const {normal, senior} = normalMenu(ctx);
  const normalList = normal.map(({name, md5, type}) => {
    const image = getBase64Img(type, md5);
    return {name, image};
  });
  const seniorList = senior.map(({name, md5, type}) => {
    const image = getBase64Img(type, md5);
    return {name, image};
  });
  return {
    normal: normalList,
    senior: seniorList
  };
};

const getCatalog = ctx => {
  const list = getAllStories(ctx);
  if (!list.length) {
    return [];
  }

  return list.map(({mid, name, type}) => {
    return {mid, name, type};
  });
};

const open = (mid, ctx) => {
  const story = getStoryByMid(mid, ctx);
  if (!story) {
    return null;
  }
  
  const {md5, type} = story;
  const options = getOptions(mid, type, md5, ctx);
  return options;
};

const create = (options, ctx) => {
  const result = checkRepeat(options.name, ctx);
  if (result) {
    return result;
  }

  const {name, type, image, layerType = ELEMENT_TYPE.TEXT} = options;
  const mid = getMid();
  const md5 = crypto.createHash('md5').update(name).digest('hex');

  try {
    createStory(mid, name, md5, '', type, ctx);
    if (type === STORY_TYPE.GIF) {
      createGif(mid, {}, ctx);
    }
    writeImg(md5, image);

    const eid = `${mid}_${layerType.toLowerCase()}_0`;
    createElement(eid, mid, layerType, 0, true, ctx);

    if (layerType = ELEMENT_TYPE.GIF) {
      createImage(eid, {}, ctx);
    } else {
      createText(eid, {}, ctx);
    }

    return sucess({ mid });
  } catch (err) {
    return error(err.toString(), CREATE_STORY_FAIL);
  }
};

const createLayer = (mid, type, ctx) => {
  const elements = getElementsByStoryId(mid, ctx);
  const layer = elements.length;
  const eid = `${mid}_${type.toLowerCase()}_${layer}`;

  createElement(eid, mid, type, layer, true, ctx);

  let options = {};
  if (type === ELEMENT_TYPE.IMAGE) {
    createImage(eid, {}, ctx);
    const imageData = getImageByEid(eid, ctx);
    const {x, y, width, height, ipath} = imageData;
    options = {eid, x, y, width, height, ipath};
  } else {
    createText(eid, {}, ctx);
    const textData = getTextByEid(eid, ctx);
    const {content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree} = textData;
    options = {eid, content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree};
  }

  return sucess({ eid, type, options });
}

const update = (params, ctx) => {
  const {eid, type, options} = params;

  try {
    if (type === ELEMENT_TYPE.IMAGE) {
      updateImage(eid, options, ctx);
    } else {
      updateText(eid, options, ctx);
    }

    return emptySucess();
  } catch (err) {
    return error(err.toString(), UPDATE_TEXT_FAIL);
  }
};

const updateStoryName = (options, ctx) => {
  try {
    const {mid, name} = options;
    updateStory(mid, { name }, ctx);
    return emptySucess();
  } catch (err) {
    return error(err.toString(), UPDATE_NAME_FAIL);
  }
};

const getBase64 = (type, name, ctx) => {
  let imageBase64 = '';

  const filePath = testFile(type.toLowerCase(), name);
  if (filePath) {
    imageBase64 = convert(filePath);
  }

  return imageBase64;
};

const getOptions = (mid, type, md5, ctx) => {
  const image = getBase64Img(type, md5);
  const elements = getElementsByStoryId(mid, ctx);
  const children = elements.map(({eid, type}) => {
    let options = null;
    if (type === ELEMENT_TYPE.TEXT) {
      const textData = getTextByEid(eid, ctx);
      const {eid, content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree} = textData;
      options = {eid, content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree};
    } else if (ELEMENT_TYPE.IMAGE) {
      const imageData = getImageByEid(eid, ctx);
      const {eid, x, y, width, height, ipath} = imageData;
      options = {eid, x, y, width, height, ipath};
    }

    return {
      type,
      options,
    }
  });

  return {
    mid,
    type,
    image,
    children
  };
}

const checkRepeat = (name, ctx) => {
  const story = getStoryByName(name, ctx);

  if (story && story.mid) {
    return error({ name }, CREATE_REPEAT_NAME);
  }
  return false;
};

const getLatestMid = (time, ctx) => {
  const result = [];

  const storyList = getAllStories(ctx);
  storyList.forEach(({mid, name}) => {
    if (mid.replace('meme_', '') >= time) {
      result.push(name);
    }
  });

  return Array.from(new Set(result));
};

export {
  normalMenu,
  gifMenu,
  normalImageMenu,
  getCatalog,
  open,
  create,
  createLayer,
  update,
  updateStoryName,
  getOptions,
  getBase64,
  getLatestMid
};
