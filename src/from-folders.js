import path from 'path';
import { find, isEmpty } from 'lodash';
import yaml from 'js-yaml';

import getSectionsTree from './get-sections-tree';


function parseTree(rootFolder) {
  const tree = getSectionsTree(rootFolder);
  const { children } = tree;

  const manifestFile = find(children, { extension: 'json' });
  let final = {};

  if (manifestFile) {
    const manifest = JSON.parse(manifestFile.content);
    for (const key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        const val = manifest[key];
        const matchExample = val.match(/{{(.*)}}/);

        if ( ! isEmpty(matchExample)) {
          const folder = matchExample[1];
          Object.assign(final, {
            [key]: parseTree(`${rootFolder}/${folder}`),
          });
        }

        else {
          Object.assign(final, {
            [key]: val,
          });
        }
      }
    }
  }
  else {
    const index = find(children, { extension: 'yml' });
    if (index) {
      const translations = ymlToJson(index.content);
      Object.assign(final, {
        ...translations,
      });
    }
  }

  return final;
}

function jsonToYml(json) {
  return yaml.safeDump(json);
}

function ymlToJson(yml) {
  return yaml.safeLoad(yml);
}

export default function fromFolders(rootFolder) {
  return jsonToYml(parseTree(rootFolder));
}
