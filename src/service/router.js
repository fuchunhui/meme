import {getCatalog, open} from './data.js';

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
    console.log('open: ', req.body);

    // const {mid, type} = req.body;
    let mid = 'meme_1630929518004';
    let type = 'COMMON';

    const data = open(mid, type);
    res.send({
      data,
      errNo: 0,
      message: 'success'
    });
  });

  app.post('/image/save', (req, res) => {
    console.log('request: ', JSON.stringify(req.body));
    // 调用服务
  });
};

export {
  listen
};
