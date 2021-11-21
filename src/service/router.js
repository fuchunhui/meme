import {
  getCatalog,
  open,
  create,
  updateText
} from './data.js';

import {COMMAND_LIST} from '../config/constant.js';

const listen = app => {
  app.get('/image/catalog', (req, res) => {
    const data = getCatalog();

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.get('/image/open', (req, res) => {
    const {mid, type} = req.query;
    const data = open(mid, type);

    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.post('/image/save', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = updateText(req.body);
    res.send(data);
  });

  app.post('/image/create', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    const data = create(req.body);
    res.send(data);
  });

  app.get('/image/download', (req, res) => {
    console.log('备用接口');
  });

  app.get('/image/export', (req, res) => {
    console.log('备用接口');
  });

  app.get('/image/commands', (req, res) => {
    res.send({
      data: COMMAND_LIST,
      errNo: 0,
      message: 'success'
    });
  });
};

export {
  listen
};
