import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import {come, listen} from './app.js';
import {config} from './src/config/index.js';

const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.text());
app.use(express.raw());
app.use(express.urlencoded({extended: false, limit: '10mb'}));
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.all(/(.*)/, (req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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

app.post(/(.*)/, (req, res) => {
  console.log('request: ', JSON.stringify(req.body));

  if (req.body.echostr) {
    const {signature, rn, timestamp, echostr} = req.body;
    let auth = false;
    for (const {token} of config) {
      const str = crypto.createHash('md5').update(`${rn}${timestamp}${token}`).digest('hex');
      if (signature === str) {
        auth = true;
        res.send(echostr);
        break;
      }
    }

    if (!auth) {
      res.send('check signature fail');
    }

    return;
  }

  const data = req.body;
  if (!data) {
    console.error('req.body 不见了');
  }
  come(data);
});

app.listen(8080, () => {
  console.log('server start.');
});
