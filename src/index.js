import fs from 'fs';
import shell from 'shelljs';

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
  const result = update(rootFolder, targetPath, locale);
  // do some promise thing and then...
  // command to push to localeapp (only the target file)
  console.log(rootFolder, targetPath, locale);
  shell.exec(
    `localeapp push ${targetPath}/${locale}.yml`,
  ).stdout;
}

function pull(rootFolder, targetPath, locale) {
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
