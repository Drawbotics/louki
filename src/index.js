import fs from 'fs';

import fromFolders from './from-folders';

/**
  AVAILABLE COMMANDS:
  - update : will parse the translations from the root folder provided and replae
    the contents of dist with the new translation (only the default local will be replaced)
  - push : will call update and then through localeapp it will push the final yml file (default local only again)
  - pull : will retrieve the data from localeapp and replace the contents of dist with those files, it will
    also disect the large translation file (en.yml) and replace the contents of the index files.
**/


// remember to add try catch for file operations
function update(rootFolder, targetFolder) {
  const finalTranslation = fromFolders(rootFolder);
  const fileName = 'en.yml';  // this file should be set as default somewhere

  try {
    fs.writeFileSync(`${targetFolder}/${fileName}`, finalTranslation);
  }
  catch (err) {
    console.error(err);
  }
  return finalTranslation;
}

function push() {

}

function pull() {

}

export default function awesome(command, rootFolder, targetFolder='') {
  if (command === 'update') {
    return update(rootFolder, targetFolder);
  }
}
