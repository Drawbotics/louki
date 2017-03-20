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
function update(rootFolder, targetFile) {
  const finalTranslation = fromFolders(rootFolder);
  try {
    fs.writeFileSync(targetFile, finalTranslation);
  }
  catch (err) {
    console.error(err);
  }
  return finalTranslation;
}

function push(rootFolder, targetFile) {
  update(rootFolder, targetFile);
  // do some promise thing and then...
  // command to push to localeapp (only the target file)
}

function pull(rootFolder, targetFile, locale) {
  const updatedFolders = toFolders(rootFolder, targetFile, locale);
  return updatedFolders;
}

export default function awesome(command, rootFolder, target='', defaultLocale='en') {  // this must be set somewhere
  if (command === 'update') {
    return update(rootFolder, target);
  }
  else if (command === 'push') {
    return push(rootFolder, target);
  }
  else if (command === 'pull') {
    return pull(rootFolder, target, defaultLocale);  // here the target is the target folder
  }
  else {
    console.log('Command not found');
  }
}
