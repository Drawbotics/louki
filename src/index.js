import fs from 'fs';

import fromFolders from './from-folders';
import toFolders from './to-folders';

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
  console.log(rootFolder);
  const finalTranslation = fromFolders(rootFolder);
  console.log(finalTranslation);
  try {
    fs.writeFileSync(`${targetPath}/${locale}.yml`, finalTranslation);   // file type is hardcoded for now
  }
  catch (err) {
    console.error(err);
  }
  return finalTranslation;
}

function push(rootFolder, targetPath, locale) {
  update(rootFolder, targetFile);
  // do some promise thing and then...
  // command to push to localeapp (only the target file)
}

function pull(rootFolder, targetPath, locale) {
  const compiledLocale = fs.readFileSync(`${targetPath}/${locale}.yml`, 'utf8');
  const updatedFolders = toFolders(rootFolder, compiledLocale);
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
