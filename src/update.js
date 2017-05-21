import fs from 'fs';

import { fromFolders } from './utils';


export default function update(rootFolder, targetPath, locale) {
  const finalTranslation = fromFolders(rootFolder, locale);
  try {
    fs.writeFileSync(`${targetPath}/${locale}.yml`, finalTranslation);   // file type is hardcoded for now
    console.log(`Updated target file ${locale}.yml`);
  }
  catch (err) {
    console.error(err);
  }
  return finalTranslation;
}
