import fs from 'fs';
import FormData from 'form-data';
import shell from 'shelljs';
import dotenv from 'dotenv';
import get from 'lodash/get';

import fromFolders from './from-folders';
import toFolders from './to-folders';
import { ymlToJson, jsonToYml } from './utils';

import { localeappPull, localeappPush } from './api';


/**
  AVAILABLE COMMANDS:
  - update : will parse the translations from the root folder provided and replae
    the contents of dist with the new translation (only the default local will be replaced)
  - push : will call update and then through localeapp it will push the final yml file (default local only again)
  - pull : will retrieve the data from localeapp and replace the contents of dist with those files, it will
    also disect the large translation file (en.yml) and replace the contents of the index files.
**/


// remember to add try catch for file operations
function update(rootFolder, targetPath, locale) {
  const finalTranslation = fromFolders(rootFolder, locale);
  try {
    fs.writeFileSync(`${targetPath}/${locale}.yml`, finalTranslation);   // file type is hardcoded for now
  }
  catch (err) {
    console.error(err);
  }
  return finalTranslation;
}


function push(rootFolder, targetPath, locale) {
  update(rootFolder, targetPath, locale);
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


function pull(rootFolder, targetPath, locale) {
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


export default function louki(command, rootFolder, targetPath, defaultLocale) {
  if (command === 'update') {
    return update(rootFolder, targetPath, defaultLocale);
  }
  else if (command === 'push') {
    return push(rootFolder, targetPath, defaultLocale);
  }
  else if (command === 'pull') {
    return pull(rootFolder, targetPath, defaultLocale);
  }
  else {
    console.error('Command not found');
    return;
  }
}
