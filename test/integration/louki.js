import { expect } from 'chai';
import path from 'path';
import fs from 'fs';
import { get } from 'lodash';

import louki from '../../src';


describe('LOUKI EXAMPLE', () => {
  describe('louki(command)', () => {
    const rootFolder = path.resolve(__dirname, '../mock/config/full/sections');
    const targetFolder = path.resolve(__dirname, '../mock/dist');
    const targetFile = 'en-target';
    const desiredFile = `${targetFolder}/en-desired.yml`;

    describe('louki(build, root, target)', () => {
      let desiredTranslation;

      before(() => {
        desiredTranslation = fs.readFileSync(desiredFile, 'utf8');
      });
      it('the build command should take the contents of the root folder and replace them in the dist', () => {
        const targetTranslation = louki('build', rootFolder, targetFolder, targetFile);
        expect(targetTranslation).to.equal(desiredTranslation);
      });
    });

    describe('louki(update, root, target)', () => {
      let desiredManifest;
      let desiredQuick;

      before(() => {
        desiredManifest = {
          "order": "{{order}}",
          "studio": "{{studio}}",
          "back_office": "{{backoffice}}",
        };
        desiredQuick = {
          "quick": "Veloce",
          "service": "Servizio %{ciao}"
        };
      });
      it('the update command should replace the contents of the dist folder and update the source (config) files', () => {
        const targetFolders = louki('update', rootFolder, targetFolder, targetFile);
        const updatedManifest = get(targetFolders, 'manifest');
        const updatedQuick = get(targetFolders, 'order.quick-services.index');
        expect(updatedManifest).to.deep.equal(desiredManifest);
        expect(updatedQuick).to.deep.equal(desiredQuick);
      });
    });
  });
});
