import express from 'express';

import {
  getCatalog,
  open,
  create,
  createLayer,
  deleteLayer,
  reorderLayer,
  update,
  updateStoryName,
  getNamedImg,
} from './data.js';
import {
  createStaticCollection,
  addStaticItems,
  getStaticCatalog,
  getStaticItems,
  getStaticItemImage,
  deleteStaticItem,
} from './static.js';

import {COMMAND_LIST} from '../config/constant.js';

const DB_NAME = 'db-name';

const router = express.Router();

const buildCtx = req => {
  const path = req.get(DB_NAME) || 'meme';
  return {
    path
  };
};

router.use((req, res, next) => {
  if (req.path.startsWith('/butter')) {
    req.url = req.url.replace('/butter', '/image');
    req.headers[DB_NAME] = 'butter';
  }

  next();
});

router.get('/image/config', (req, res) => {
  const data = {
    commands: COMMAND_LIST
  };
  res.json({
    data,
    errNo: 0,
    message: 'success'
  });
});

router.get('/image/catalog', (req, res) => {
  const ctx = buildCtx(req);
  const data = getCatalog(ctx);

  res.json({
    data,
    errNo: 0,
    message: 'success'
  });
});

router.get('/image/open', (req, res) => {
  try {
    const ctx = buildCtx(req);
    const {mid} = req.query;
    const data = open(mid, ctx);

    res.json({
      data,
      errNo: 0,
      message: 'success'
    });
  } catch (err) {
    console.error('image open error:', err);
    res.status(500).json({
      data: null,
      errNo: -1,
      message: err.message
    });
  }
});

router.post('/image/create', (req, res) => {
  console.info('image create: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = create(req.body, ctx);
  res.json(data);
});

router.post('/image/update', (req, res) => {
  console.info('image update: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = update(req.body, ctx);
  res.json(data);
});

router.post('/image/update/name', (req, res) => {
  console.info('image save: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = updateStoryName(req.body, ctx);
  res.json(data);
});

router.get('/image/named', (req, res) => {
  try {
    const ctx = buildCtx(req);
    const {ipath, name} = req.query;
    const data = getNamedImg(ipath, name, ctx);

    res.json({
      data,
      errNo: 0,
      message: 'success'
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      errNo: -1,
      message: err.message
    });
  }
});

router.post('/image/layer/create', (req, res) => {
  console.info('create layer: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = createLayer(req.body, ctx);
  res.json(data);
});

router.post('/image/layer/delete', (req, res) => {
  console.info('delete layer: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = deleteLayer(req.body, ctx);
  res.json(data);
});

router.post('/image/layer/reorder', (req, res) => {
  console.info('reorder layer: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = reorderLayer(req.body, ctx);
  res.json(data);
});

router.get('/image/static/catalog', (req, res) => {
  const ctx = buildCtx(req);
  const data = getStaticCatalog(ctx);
  res.json(data);
});

router.get('/image/static/items', (req, res) => {
  const ctx = buildCtx(req);
  const {mid} = req.query;
  const data = getStaticItems(mid, ctx);
  res.json(data);
});

router.get('/image/static/item', (req, res) => {
  const ctx = buildCtx(req);
  const id = Number(req.query.id);
  const data = getStaticItemImage(id, ctx);
  res.json(data);
});

router.post('/image/static/create', (req, res) => {
  console.info('static create: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = createStaticCollection(req.body, ctx);
  res.json(data);
});

router.post('/image/static/add', (req, res) => {
  console.info('static add items: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = addStaticItems(req.body, ctx);
  res.json(data);
});

router.post('/image/static/item/delete', (req, res) => {
  console.info('static delete item: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const id = Number(req.body.id);
  const data = deleteStaticItem(id, ctx);
  res.json(data);
});

export {
  router
};
