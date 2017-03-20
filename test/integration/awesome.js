import { expect } from 'chai';
import path from 'path';
import fs from 'fs';
import { get } from 'lodash';

import awesome from '../../src';


describe('AWESOME EXAMPLE', () => {
  describe('awesome(command)', () => {
    const rootFolder = path.resolve(__dirname, '../mock/config/full/sections');
    const targetFolder = path.resolve(__dirname, '../mock/dist');
    const targetFile = `${targetFolder}/en-target.yml`;
    const desiredFile = `${targetFolder}/en-desired.yml`;

    describe('awesome(update, root, target)', () => {
      let desiredTranslation;

      before(() => {
        desiredTranslation = fs.readFileSync(desiredFile, 'utf8');
      });
      it('the update command should take the contents of the root folder and replace them in the dist', () => {
        const targetTranslation = awesome('update', rootFolder, targetFile);
        expect(targetTranslation).to.equal(desiredTranslation);
      });
    });

    describe('awesome(pull, root, target)', () => {
      let targetTranslation;
      let desiredManifest;
      let desiredQuick;

      before(() => {
        targetTranslation = fs.readFileSync(targetFile, 'utf8');
        desiredManifest = {
          "order": "{{order}}",
          "studio": "{{studio}}",
          "user": "the user of life (shared between order and studio)"
        };
        desiredQuick = {
          "quick": "Veloce",
          "service": "Servizio %{ciao}"
        };
      });
      it('the pull command should pull from localeapp, replace the contents of the dist folder and update the config files', () => {
        const targetFolders = awesome('pull', rootFolder, targetTranslation);
        const updatedManifest = get(targetFolders, 'manifest');
        const updatedQuick = get(targetFolders, 'order.quick-services.index');
        expect(updatedManifest).to.deep.equal(desiredManifest);
        expect(updatedQuick).to.deep.equal(desiredQuick);
      });
    });
  });
});
