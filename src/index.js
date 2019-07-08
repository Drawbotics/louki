import watch from 'node-watch';

import update from './update';
import build from './build';


/**
  AVAILABLE COMMANDS:
  - build : will parse the translations from the root folder provided and replace
    the contents of dist with the new translation (only the default local will be replaced)
  - update : will disect the large translation file ([default].yml) and replace the contents of the index files
**/


export default function louki(command, rootFolder, targetPath, option, extra) {
  const { watchFiles } = extra;
  const defaultLocale = option;
  if (command === 'build') {
    if (watchFiles) {
      console.log('Louki watching for changes in root folder...');
      update(rootFolder, targetPath, defaultLocale); // run once
      watch(rootFolder, { recursive: true, filter: /\.(json|yml)$/ }, (evt, fileName) => {
        console.log(evt, fileName.replace(rootFolder, ''));
        return build(rootFolder, targetPath, defaultLocale);
      });
    }
    else {
      return build(rootFolder, targetPath, defaultLocale);
    }
  }
  else if (command === 'update') {
    return update(rootFolder, targetPath, defaultLocale);
  }
  else {
    console.error('Command not found');
    return;
  }
}
