import watch from 'node-watch';

import pull from './pull';
import push from './push';
import update from './update';
import init from './init';


/**
  AVAILABLE COMMANDS:
  - update : will parse the translations from the root folder provided and replae
    the contents of dist with the new translation (only the default local will be replaced)
  - push : will call update and then through localeapp it will push the final yml file (default local only again)
  - pull : will retrieve the data from localeapp and replace the contents of dist with those files, it will
    also disect the large translation file (en.yml) and replace the contents of the index files.
**/


export default function louki(command, rootFolder, targetPath, option, extra) {
  const { pushDefault, watchFiles, raw } = extra;
  const defaultLocale = option;
  if (command === 'init') {
    init(option);
  }
  else if (command === 'update') {
    if (watchFiles) {
      console.log('Louki watching for changes in root folder...');
      update(rootFolder, targetPath, defaultLocale); // run once
      watch(rootFolder, { recursive: true, filter: /\.(json|yml)$/ }, (evt, fileName) => {
        console.log(evt, fileName.replace(rootFolder, ''));
        return update(rootFolder, targetPath, defaultLocale);
      });
    }
    else {
      return update(rootFolder, targetPath, defaultLocale);
    }
  }
  else if (command === 'push') {
    return push(rootFolder, targetPath, defaultLocale, pushDefault, raw);
  }
  else if (command === 'pull') {
    return pull(rootFolder, targetPath, defaultLocale, raw);
  }
  else {
    console.error('Command not found');
    return;
  }
}
