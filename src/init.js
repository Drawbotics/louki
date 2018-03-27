import fs from 'fs';
import path from 'path';

import { getConfigPath } from './utils';


export default function init(key) {
  const value = `LOCALEAPP_KEY="${key}"`;
  const configPath = getConfigPath(true);
  fs.open(configPath, 'w', (err, fd) => {
    if (err) {
      fs.writeFile(configPath, '', (err) => {
        if(err) throw err;
        writeConfig(fd, value);
      });
    }
    else {
      writeConfig(fd, value);
    }
  });
}


function writeConfig(fd, value) {
  fs.write(fd, value, (err, written) => {
    if (err) {
      console.error('Could not save key');
      throw err;
    }
    console.log('Successfully saved localeapp key');
  })
}
