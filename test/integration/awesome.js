import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import awesome from '../../src';


describe('AWESOME EXAMPLE', function() {
  describe('awesome(command)', function() {
    const rootFolder = path.resolve(__dirname, '../mock/config/full/sections');
    const targetFolder = path.resolve(__dirname, '../mock/dist');

    describe('awesome(update, root, target)', function() {

      let originalTranslation;
      let originalConfigFile;
      const modifiedFile =  path.resolve(__dirname, `${rootFolder}/order/estate/index.yml`);
      const originalFile = path.resolve(__dirname, `${targetFolder}/en.yml`);

      before(function() {
        originalTranslation = fs.readFileSync(originalFile, 'utf8');
        originalConfigFile = fs.readFileSync(modifiedFile, 'utf8');

        fs.appendFileSync(modifiedFile, "field_key: The field");
      });
      it('the update command should take the contents of the root folder and replace them in the dist', function() {
        const newTranslation = awesome('update', rootFolder, targetFolder);
        const newTranslationFileContents = fs.readFileSync(originalFile, 'utf8');
        expect(newTranslation).to.not.equal(originalTranslation);
        expect(newTranslation).to.equal(newTranslationFileContents);
      });
      after(function() {
        fs.writeFileSync(modifiedFile, originalConfigFile);
        fs.writeFileSync(originalFile, originalTranslation);
      });
    })
  });
});
