import fs from 'fs';
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

  if (shell.exec(`localeapp push ${targetPath}/${locale}.yml`).code !== 0) {
    shell.echo('Not a rails project, trying with env variable');

    if (! localeappKey) {
      console.error('No localeapp project key found in .env! Please specify one');
    }
    else {
      localeappPush(localeappKey, 'file');
    }
  }
}


function pull(rootFolder, targetPath, locale) {

  const localeappKey = get(dotenv.config(), 'parsed.LOCALEAPP_KEY', null);

  console.log(process.env);

  if (shell.exec('localeapp pull').code !== 0) {
    shell.echo('Not a rails project, trying with env variable');
    if (! localeappKey) {
      console.error('No localeapp project key found in .env! Please specify one');
    }
    else {
      const allTrans = localeappPull(localeappKey).then(({ response, body }) => {
        const localesArray = ymlToJson(body);
        Object.entries(localesArray).map((l) => {
          const ymlLocale = jsonToYml({ [l[0]]: l[1] });
          fs.writeFileSync(`${targetPath}/${l[0]}.yml`, ymlLocale);
        });
      });
      const compiledLocale = fs.readFileSync(`${targetPath}/${locale}.yml`, 'utf8');
      const updatedFolders = toFolders(rootFolder, compiledLocale, locale);
      return updatedFolders;
    }
    return;
  }

  const compiledLocale = fs.readFileSync(`${targetPath}/${locale}.yml`, 'utf8');
  const updatedFolders = toFolders(rootFolder, compiledLocale, locale);
  return updatedFolders;
}


export default function awesome(command, rootFolder, targetPath, defaultLocale='en') {  // this must be set somewhere
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
