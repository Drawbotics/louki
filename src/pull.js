import fs from 'fs';
import get from 'lodash/get';
import dotenv from 'dotenv';

import {
  localeappPull,
  ymlToJson,
  jsonToYml,
  toFolders,
} from './utils';


export default function pull(rootFolder, targetPath, locale) {
  const localeappKey = get(dotenv.config(), 'parsed.LOCALEAPP_KEY', null);
  if (! localeappKey) {
    console.error('No localeapp project key found in .env! Please specify one');
    return null;
  }
  else {
    return localeappPull(localeappKey).then(({ response, body }) => {
      const localesArray = ymlToJson(body);
      console.log(`Successfully pulled locales ${Object.keys(localesArray).join(', ')} from Localeapp`);
      Object.entries(localesArray).map((l) => {
        const ymlLocale = jsonToYml({ [l[0]]: l[1] });
        fs.writeFileSync(`${targetPath}/${l[0]}.yml`, ymlLocale);
      });
      const compiledLocale = fs.readFileSync(`${targetPath}/${locale}.yml`, 'utf8');
      const updatedFolders = toFolders(rootFolder, compiledLocale, locale);
      console.log('Folders updated');
      return updatedFolders;
    }).catch((err) => console.error(err));
  }
}
