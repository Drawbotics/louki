import fs from 'fs';

import { fromFolders } from './utils';


export default function update(rootFolder, targetPath, locale) {
  const finalTranslation = fromFolders(rootFolder, locale);
  try {
    fs.writeFileSync(`${targetPath}/${locale}.yml`, finalTranslation);   // file type is hardcoded for now
  }
  catch (err) {
    console.error(err);
  }
  return finalTranslation;
}
