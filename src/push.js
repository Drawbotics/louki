import fs from 'fs';
import get from 'lodash/get';
import path from 'path';

import { localeappPush } from './utils';
import update from './update';


const configPath = path.resolve(__dirname, '../.config');


export default function push(rootFolder, targetPath, locale, pushDefault, raw=false) {
  if (pushDefault && !raw) {
    update(rootFolder, targetPath, locale); // only build if default locale is pushed
  }
  try {
    const localeappKey = fs.readFileSync(configPath, 'utf8').split('=')[1].replace(/"/g, '');
    const filePath = `${targetPath}/${locale}.yml`;
    const data = fs.createReadStream(filePath);
    return localeappPush(localeappKey, data).then(({ response, body }) => {
      console.log(`Successfully pushed ${locale}.yml to Localeapp`);
    }).catch((err) => console.error(err));
  }
  catch (err) {
    console.log('No localeapp project key found in! Please specify one with the init command');
  }
}
