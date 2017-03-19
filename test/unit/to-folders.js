import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import toFolders from '../../src/to-folders';


describe('TO FOLDERS EXAMPLE', () => {
  describe('toFolders(rootFolder, target)', () => {
    describe('when the structure is complex', () => {
      const rootFolder = '../mock/config/generated/sections';
      const targetFile = 'en-base.yml';
      const rootPath = path.resolve(__dirname, rootFolder);
      const targetFilePath = path.resolve(__dirname, targetFile);

      let en;
      before(function() {
        en = fs.readFileSync(targetFilePath, 'utf8');
      });

      it('should take the contents of the target file and split them into the source folders', () => {
        const res = toFolders(rootPath, en);
      });
    });
  });
});
