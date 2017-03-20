import path from 'path';
import { find, isEmpty, omit, cloneDeep } from 'lodash';
import fs from 'fs';

import getSectionsTree from './get-sections-tree';
import { ymlToJson, jsonToYml } from './utils';


function parseTranslation(json, rootFolder) {
  const { children } = getSectionsTree(rootFolder);
  const manifestFile = find(children, { extension: 'json' });
  const final = {};

  if (manifestFile) {
    const manifest = JSON.parse(manifestFile.content);
    const newJson = {};

    for (const key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        const val = manifest[key];
        const matchExample = val.match(/{{(.*)}}/);

        if ( ! isEmpty(matchExample)) {
          Object.assign(newJson, {
            [key]: val,
          });

          const folder = matchExample[1];

          // this we return
          Object.assign(final, {
            [folder]: parseTranslation(json[key], `${rootFolder}/${folder}`),
          });

          json = omit(json, key);   // deletes the folder key so that we are
                                    // left with only with simple keys
        }

        else {
          if (json[key]) {
            Object.assign(newJson, {
              [key]: json[key],
            });

            json = omit(json, key);
          }
        }
      }
    }

    // now we are left only with simple keys, so add them to the manifest (newJson)
    Object.assign(newJson, json);

    // add updated manifest to folder structure object
    Object.assign(final, {
      manifest: newJson,
    });

    fs.writeFile(`${rootFolder}/manifest.json`, JSON.stringify(newJson, null, 2), (err) => {
      if (err) throw err;
    });
  }

  // now replace the rest in the manifest
  else {
    fs.writeFile(`${rootFolder}/index.yml`, jsonToYml(json), (err) => {
      if (err) throw err;
    });

    // add new contents of the yml (not parsed)
    Object.assign(final, {
      index: json,
    });
  }

  return final;
}

export default function toFolders(rootFolder, target, locale) {
  const strippedTarget = ymlToJson(target)[locale];
  return parseTranslation(strippedTarget, rootFolder);
}
