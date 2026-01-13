import crypto from 'crypto';
import {getMid, getEid} from '../utils/keys.js';
import {writeImg, getBase64Img, getBase64ImgByPath} from '../convert/write.js';

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
  deleteElement,
  deleteText,
  deleteImage,
  reorderElement,
} from '../db/index.js';

import {emptySucess, sucess, error} from './ajax.js';
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

  const catalog = list.map(({mid, name, type}) => {
    return {mid, name, type};
  });

  const [textCatalog, gifCatalog] = group(catalog, item => item.type === STORY_TYPE.TEXT);
  return [
    {
      type: STORY_TYPE.TEXT,
      id: 'text_catalog',
      name: '文本表情',
      children: textCatalog
    },
    {
      type: STORY_TYPE.GIF,
      id: 'gif_catalog',
      name: '动图表情',
      children: gifCatalog
    }
  ];
};

const open = (mid, ctx) => {
  const story = getStoryByMid(mid, ctx);
  if (!story) {
    return null;
  }
  
  const {name, md5, type} = story;
  const options = getOptions(mid, type, md5, ctx);
  return {
    name,
    ...options
  };
};

const create = (options, ctx) => {
  const result = checkRepeat(options.name, ctx);
  if (result) {
    return result;
  }

  const {name, image, layerType = ELEMENT_TYPE.TEXT} = options;
  const type = image.startsWith('data:image/gif') ? STORY_TYPE.GIF : STORY_TYPE.TEXT;
  const mid = getMid();
  const md5 = crypto.createHash('md5').update(name).digest('hex');

  try {
    createStory(mid, name, md5, '', type, ctx);
    if (type === STORY_TYPE.GIF) {
      createGif(mid, {}, ctx);
    }
    writeImg(md5, image);

    const eid = getEid();
    createElement(eid, mid, layerType, 0, true, ctx);

    if (layerType === ELEMENT_TYPE.IMAGE) {
      createImage(eid, {}, ctx);
    } else {
      createText(eid, {}, ctx);
    }

    return sucess({ mid });
  } catch (err) {
    return error(err.toString(), CREATE_STORY_FAIL);
  }
};

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

const getOptions = (mid, type, md5, ctx) => {
  const image = getBase64Img(type, md5);
  const elements = getElementsByStoryId(mid, ctx);
  const children = elements.map(({eid, type}) => {
    let options = null;
    if (type === ELEMENT_TYPE.TEXT) {
      const textData = getTextByEid(eid, ctx);
      const {content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree} = textData;
      options = {eid, content, x, y, max, size, font, color, stroke, swidth, align, direction, blur, degree};
    } else if (ELEMENT_TYPE.IMAGE) {
      const imageData = getImageByEid(eid, ctx);
      const {x, y, width, height, ipath} = imageData;
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


const createLayer = (params, ctx) => {
  const {mid, type} = params;
  const elements = getElementsByStoryId(mid, ctx);
  const layer = elements.length;
  const eid = getEid();

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

const deleteLayer = (params, ctx) => {
  const {mid, eid} = params;
  const elements = getElementsByStoryId(mid, ctx);
  const element = elements.find(e => e.eid === eid);
  if (!element) {
    return error('Layer not found', 'DELETE_LAYER_FAIL');
  }
  const layerToDelete = element.layer;

  if (element.type === ELEMENT_TYPE.TEXT) {
    deleteText(eid, ctx);
  } else if (element.type === ELEMENT_TYPE.IMAGE) {
    deleteImage(eid, ctx);
  }
  deleteElement(eid, ctx);

  elements.forEach(e => {
    if (e.layer > layerToDelete) {
      const newLayer = e.layer - 1;
      reorderElement(e.eid, newLayer, ctx);
    }
  });

  return emptySucess();
};

// 调整图层顺序，direction: 'up' | 'down'
const reorderLayer = (params, ctx) => {
  const {mid, eid, direction} = params;
  const elements = getElementsByStoryId(mid, ctx);
  const index = elements.findIndex(e => e.eid === eid);
  if (index === -1) {
    return error('Layer not found', 'REORDER_LAYER_FAIL');
  }

  const target = elements[index];
  if (direction === 'up') {
    if (index === 0) return emptySucess();
    const prev = elements[index - 1];
    reorderElement(target.eid, prev.layer, ctx);
    reorderElement(prev.eid, target.layer, ctx);
  } else if (direction === 'down') {
    if (index === elements.length - 1) return emptySucess();
    const next = elements[index + 1];
    reorderElement(target.eid, next.layer, ctx);
    reorderElement(next.eid, target.layer, ctx);
  } else {
    return error('Invalid direction', 'REORDER_LAYER_FAIL');
  }

  return emptySucess();
};

const getNamedImg = (ipath = 'svg', name) => {
  return getBase64ImgByPath(ipath.toLowerCase(), name);
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
  deleteLayer,
  reorderLayer,
  update,
  updateStoryName,
  getNamedImg,
  getOptions,
  getLatestMid
};
