import path from 'path';
import { find, isEmpty, omit, cloneDeep } from 'lodash';
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
          parseTranslation(json[key], `${rootFolder}/${folder}`);

          // if the key defines a folder, remove it from the json, so that
          // it does not overried it with all the translations
          json = omit(json, key);
        }
      }
    }

    // after the loop to update files, we merge the two "manifests"
    const newJson = Object.assign(manifest, json);
    console.log(newJson);
    fs.writeFile(`${rootFolder}/manifest.json`, JSON.stringify(newJson, null, 2), (err) => {
      if (err) throw err;
    });
  }
  // now replace the rest in the manifest
  else {
    fs.writeFile(`${rootFolder}/index.yml`, jsonToYml(json), (err) => {
      if (err) throw err;
    });
  }
}

export default function toFolders(rootFolder, target) {
  const res = parseTranslation(ymlToJson(target), rootFolder);
  console.log(res);
  return '';
}
