import path from 'path';
import { find } from 'lodash';

import getSectionsTree from './get-sections-tree';


function parseTree(tree) {
  const { children } = tree;

  const manifest = JSON.parse(find(children, { extension: 'json' }).content);
  

  console.log(manifest);
}

export default function awesome(rootFolder, targetFolder) {

  const tree = getSectionsTree(rootFolder);
  parseTree(tree);

}
