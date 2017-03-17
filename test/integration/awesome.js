import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import awesome from '../../src';


describe('AWESOME EXAMPLE', function() {
  describe('awesome(command)', function() {
    const rootFolder = path.resolve(__dirname, '../mock/config/full/sections');
    const targetFolder = path.resolve(__dirname, '../mock/dist');
    const targetFile = `${targetFolder}/en-target.yml`;
    const desiredFile = `${targetFolder}/en-desired.yml`;

    describe('awesome(update, root, target)', function() {
      let desiredTranslation;

      before(function() {
        desiredTranslation = fs.readFileSync(desiredFile, 'utf8');
      });
      it('the update command should take the contents of the root folder and replace them in the dist', function() {
        const targetTranslation = awesome('update', rootFolder, targetFile);
        expect(targetTranslation).to.equal(desiredTranslation);
      });
    });
  });
});
