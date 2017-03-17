import path from 'path';
import { find, isEmpty } from 'lodash';

import getSectionsTree from './get-sections-tree';


function parseTree(rootFolder) {
  const tree = getSectionsTree(rootFolder);
  const { children } = tree;

  const manifestFile = find(children, { extension: 'json' });
  let final = '';

  if (manifestFile) {
    const manifest = JSON.parse(manifestFile.content);
    for (const key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        const val = manifest[key];
        const matchExample = val.match(/{{(.*)}}/);

        if ( ! isEmpty(matchExample)) {
          const folder = matchExample[1];
          console.log('FOLDER -- ', folder);
          final += `${key}: \n\t${parseTree(`${rootFolder}/${folder}`)}`;
          // console.log('temp+++',temp, '+++');
        }

        else {
          const simpleKey = `${key}: ${val}`;
          console.log('Simple key: ', simpleKey);

          final += simpleKey;
        }
      }
      console.log('manifest has no property');
      // return '';
    }
  }
  else {
    console.log('no manifest, gonna read yml');
    const index = find(children, { extension: 'yml' });

    if (index) {
      const translations = index.content;
      console.log(translations);
      final += translations;
    }
    console.log('no yml');
    // return '';
    // console.log(index);
  }

  return final;
}


// function parseTree(rootFolder) {
//   /*
//     if folder has manifest, iterate over folders && items
//       if folder => return fullTran + parseTree(rootFolder)
//       else return simpleKey
//     if folder does not have manifest, return translation
//   */
//
//
// }

export default function awesome(rootFolder, targetFolder='') {
  // const fullFile = readSections(rootFolder);
  // const tree = getSectionsTree(rootFolder);
  const fullFile = parseTree(rootFolder);
  console.log('==============================');
  console.log(fullFile);
}
