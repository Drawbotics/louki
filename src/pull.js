import fs from 'fs';
import get from 'lodash/get';
import path from 'path';

import {
  localeappPull,
  ymlToJson,
  jsonToYml,
  toFolders,
} from './utils';


const configPath = path.resolve(__dirname, '../.config');


export default function pull(rootFolder, targetPath, locale, raw=false) {
  try {
    const localeappKey = fs.readFileSync(configPath, 'utf8').split('=')[1].replace(/"/g, '');
    return localeappPull(localeappKey).then(({ response, body }) => {
      const localesArray = ymlToJson(body);
      console.log(`Successfully pulled locales ${Object.keys(localesArray).join(', ')} from Localeapp`);
      Object.entries(localesArray).map((l) => {
        const ymlLocale = jsonToYml({ [l[0]]: l[1] });
        fs.writeFileSync(`${targetPath}/${l[0]}.yml`, ymlLocale);
      });
      if (raw) return {};
      const compiledLocale = fs.readFileSync(`${targetPath}/${locale}.yml`, 'utf8');
      const updatedFolders = toFolders(rootFolder, compiledLocale, locale);
      console.log('Folders updated');
      return updatedFolders;
    }).catch((err) => console.error(err));
  }
  catch (err) {
    console.error('No localeapp project key found in! Please specify one with the init command');
  }
}
