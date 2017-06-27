import fs from 'fs';
import get from 'lodash/get';
import dotenv from 'dotenv';

import { localeappPush } from './utils';
import update from './update';


export default function push(rootFolder, targetPath, locale, pushDefault, raw=false) {
  if (pushDefault && !raw) {
    update(rootFolder, targetPath, locale); // only build if default locale is pushed
  }
  const localeappKey = get(dotenv.config(), 'parsed.LOCALEAPP_KEY', null);
  if (! localeappKey) {
    console.error('No localeapp project key found in .env! Please specify one');
  }
  else {
    const filePath = `${targetPath}/${locale}.yml`;
    const data = fs.createReadStream(filePath);
    return localeappPush(localeappKey, data).then(({ response, body }) => {
      console.log(`Successfully pushed ${locale}.yml to Localeapp`);
    }).catch((err) => console.error(err));
  }
}
