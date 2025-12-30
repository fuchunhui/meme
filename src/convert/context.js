import {parser} from './parser.js';
import {getConfig} from '../config/index.js';

const createContext = encryption => {
  const {fromid, toid, command, params, key} = parser(encryption);
  const {name, path, help, warns, news, others} = getConfig(key);

  const context = {
    fromid,
    toid,
    command,
    params,
    key,
    name,
    path,
    help,
    warns,
    news,
    others
  };

  return context;
};

const getContext = () => {
  return {};
};

const setContext = context => {
  return context;
};

const updateContext = updates => {
  return updates;
};

const clearContext = () => {
  return {};
};

export {
  createContext,
  getContext,
  setContext,
  updateContext,
  clearContext
};