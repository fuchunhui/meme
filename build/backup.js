import path from 'path';
import fs from 'fs';
import {backup} from '../app.js';

const date = new Date();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const datePath = `${date.getFullYear()}-${month}-${day}`;

const PUBLIC = 'assets/backup';
const __dirname = path.resolve();
const tardir = path.resolve(__dirname, PUBLIC, datePath);

if (!fs.existsSync(tardir)) {
  fs.mkdirSync(tardir, {
    recursive: true
  });
}

backup(tardir);
