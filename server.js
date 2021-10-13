import express from 'express';
import md5 from 'md5';
import path from 'path';
import {come, listen} from './app.js';
import config from './src/config/index.js';

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/test', (req, res) => {
  console.log(`url: ${req.path} request: ${JSON.stringify(req.query)}`);
  res.send('test get request.');
});

listen(app);

app.post('*', (req, res) => {
  console.log('request: ', JSON.stringify(req.body));

  if (req.body.echostr) {
    const {signature, rn, timestamp, echostr} = req.body;
    const str = md5(`${rn}${timestamp}${config.token}`);
    if (signature === str) {
      res.send(echostr);
    } else {
      res.send('check signature fail');
    }

    return;
  }

  const data = req.body;
  if (!data) {
    console.error('req.body不见了');
  }
  come(data);
});

app.listen(8080, () => {
  console.log('server start.');
});
