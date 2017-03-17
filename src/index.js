import path from 'path';
import { find, isEmpty } from 'lodash';

import getSectionsTree from './get-sections-tree';


function parseTree(tree, rootFolder) {
  const { children } = tree;

  const manifestFile = find(children, { extension: 'json' });

  if (manifestFile) {
    const manifest = JSON.parse(manifestFile.content);
    for (const key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        const val = manifest[key];
        const matchExample = val.match(/{{(.*)}}/);

        if ( ! isEmpty(matchExample)) {
          const folder = matchExample[1];
          console.log('FOLDER -- ', folder);
          awesome(`${rootFolder}/${folder}`);
        }
      }
    }
  }
  else {
    console.log('no manifest');  // here we read the yml
    const index = find(children, { extension: 'yml' });

    if (index) {
      const translations = index.content;
      console.log(translations);
    }
    // console.log(index);
  }

}

export default function awesome(rootFolder, targetFolder='') {
  const tree = getSectionsTree(rootFolder);
  console.log('-------------------');
  parseTree(tree, rootFolder);

}
