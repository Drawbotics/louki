import fs from 'fs';
import path from 'path';

const configPath = path.resolve(__dirname, '../.config');


export default function init(key) {
  const value = `LOCALEAPP_KEY="${key}"`;
  fs.open(configPath, 'w', (err, fd) => {
    if (err) throw err;
    fs.write(fd, value, (err, written) => {
      if (err) {
        console.error('Could not save key');
        throw err;
      }
      console.log('Successfully saved localeapp key');
    })
  });
}
