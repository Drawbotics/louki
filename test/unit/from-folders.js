import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import fromFolders from '../../src/from-folders';


describe('FROM FOLDERS EXAMPLE', function() {

  describe('fromFolders(rootFolder)', function() {
    describe('when the structure is complex, contains single keys, multiple folders', function() {
      const rootFolder = '../mock/config/full/sections';
      const fullRootPath = path.resolve(__dirname, rootFolder);

      let en;
      before(function() {
        en = fs.readFileSync(path.resolve(__dirname, 'en-from.yml'), 'utf8');
      });
      it('the generated yml file should contain all contents of the rootFolder', function() {
        expect(fromFolders(fullRootPath)).to.equal(en);
      });
    });
    describe('whem the structure is the most simple i.e. only 1 yml file at the root', function() {
      const rootFolder = '../mock/config/simple';
      const fullRootPath = path.resolve(__dirname, rootFolder);

      let en;
      before(function() {
        en = fs.readFileSync(path.resolve(__dirname, '../mock/config/simple/index.yml'), 'utf8');
      });
      it('the generated yml file should contain all contents of the rootFolder', function() {
        expect(fromFolders(fullRootPath)).to.equal(en);
      });
    });
  });
});
