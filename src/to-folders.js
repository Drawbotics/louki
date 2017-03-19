import path from 'path';
import { find, isEmpty } from 'lodash';
import fs from 'fs';

import getSectionsTree from './get-sections-tree';
import { ymlToJson, jsonToYml } from './utils';


function parseTranslation(json, rootFolder) {
  const { children } = getSectionsTree(rootFolder);

  const manifestFile = find(children, { extension: 'json' });

  if (manifestFile) {
    const manifest = JSON.parse(manifestFile.content);
    for (const key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        const val = manifest[key];
        const matchExample = val.match(/{{(.*)}}/);

        if ( ! isEmpty(matchExample)) {
          const folder = matchExample[1];
          // console.log(key, folder);

          parseTranslation(json[key], `${rootFolder}/${folder}`)
        }

        else {
          // console.log('a simple key', key, val);
        }
      }
    }
  }
  else {
    console.log("there is no manifest, so replace contents", rootFolder);
    fs.writeFile(`${rootFolder}/index.yml`, jsonToYml(json), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  }
}

export default function toFolders(rootFolder, target) {
  const res = parseTranslation(ymlToJson(target), rootFolder);
  console.log(res);
  return '';
}
