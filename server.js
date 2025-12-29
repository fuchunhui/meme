import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import main from './src/main.js';
import {router} from './src/service/router.js';
import {config} from './src/config/index.js';

const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: false, limit: '10mb'}));
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(router);

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

  const encryption = req.body;
  if (!encryption) {
    console.error('req.body 不见了');
  }
  main(encryption);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('server start.');
});
