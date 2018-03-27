import fs from 'fs';
import get from 'lodash/get';
import path from 'path';

import { localeappPush, getConfigPath, getProjectName } from './utils';
import update from './update';


export default function push(rootFolder, targetPath, locale, pushDefault, raw=false) {
  if (pushDefault && !raw) {
    update(rootFolder, targetPath, locale); // only build if default locale is pushed
  }
  try {
    const configPath = getConfigPath();
    const projectName = getProjectName();
    const localeappKey = JSON.parse(fs.readFileSync(configPath, 'utf8'))[projectName];
    const filePath = `${targetPath}/${locale}.yml`;
    const data = fs.createReadStream(filePath);
    return localeappPush(localeappKey, data).then(({ response, body }) => {
      console.log(`Successfully pushed ${locale}.yml to Localeapp`);
    }).catch((err) => console.error(err));
  }
  catch (err) {
    console.log('No localeapp project key found! Please specify one with the init command');
  }
}
