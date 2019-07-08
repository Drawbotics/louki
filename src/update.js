import fs from 'fs';

import { toFolders } from './utils';


export default function update(rootFolder, targetPath, locale) {
  try {
    const compiledLocale = fs.readFileSync(`${targetPath}/${locale}.yml`, 'utf8');
    const updatedFolders = toFolders(rootFolder, compiledLocale, locale);
    console.log('Folders updated');
    return updatedFolders;
  }
  catch (err) {
    console.error(err);
  }
}
