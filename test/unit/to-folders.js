import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import toFolders from '../../src/to-folders';


describe('TO FOLDERS EXAMPLE', () => {
  describe('toFolders(rootFolder, target)', () => {
    const rootFolder = '../mock/config/generated/sections';
    const targetFile = 'en-base.yml';
    const rootPath = path.resolve(__dirname, rootFolder);
    const targetFilePath = path.resolve(__dirname, targetFile);

    const targetManifest = '../mock/config/generated/sections/manifest.json';
    const targetManifestPath = path.resolve(__dirname, targetManifest);

    let en;
    let desiredManifest;
    let desiredQuick;
    before(() => {
      en = fs.readFileSync(targetFilePath, 'utf8');
      desiredManifest = {
        "order": "{{order}}",
        "studio": "{{studio}}",
        "user": "the user of life"
      };
    });

    it('should take the contents of the target file and update the manifests (root)', () => {
      toFolders(rootPath, en);
      const updatedManifest = fs.readFileSync(targetManifestPath, 'utf8');
      // expect(JSON.parse(updatedManifest)).to.equal(desiredManifest);
      console.log('1', updatedManifest, '2', desiredManifest);
    });

  });
});
