import fs from 'fs';

export * from './api';
export * from './conversion';
export fromFolders from './from-folders';
export toFolders from './to-folders';


export function getConfigPath(create=false) {
  const home = require('user-home');
  const directory = `${home}/.louki`;
  if (!fs.existsSync(directory) && create) {
    fs.mkdirSync(directory);
  }
  return `${directory}/config`;
}
