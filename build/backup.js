import path from 'path';
import fs from 'fs';
import {backup} from '../app.js';

const date = new Date();
const datePath = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const PUBLIC = 'assets/backup';
const __dirname = path.resolve();
const tardir = path.resolve(__dirname, PUBLIC, datePath);

if (!fs.existsSync(tardir)) {
  fs.mkdirSync(tardir, { recursive: true });
}

backup(tardir);
