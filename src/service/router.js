import express from 'express';

import {
  getCatalog,
  open,
  create,
  createLayer,
  deleteLayer,
  reorderLayer,
  update,
  updateStoryName
} from './data.js';

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

router.post('/image/createLayer', (req, res) => {
  console.info('create layer: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = createLayer(req.body, ctx);
  res.json(data);
});

router.post('/image/deleteLayer', (req, res) => {
  console.info('delete layer: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = deleteLayer(req.body, ctx);
  res.json(data);
});

router.post('/image/reorderLayer', (req, res) => {
  console.info('reorder layer: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = reorderLayer(req.body, ctx);
  res.json(data);
});

router.post('/image/update', (req, res) => {
  console.info('image update: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = update(req.body, ctx);
  res.json(data);
});

// image/upload 上传图片接口，支持多个图片上传

router.post('/image/update/name', (req, res) => {
  console.info('image save: ', JSON.stringify(req.body));
  const ctx = buildCtx(req);
  const data = updateStoryName(req.body, ctx);
  res.json(data);
});

router.get('/image/download', (req, res) => {
  console.info('备用接口', req, res);
});

router.get('/image/export', (req, res) => {
  console.info('备用接口', req, res);
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

export {
  router
};
