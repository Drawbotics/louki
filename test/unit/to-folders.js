import { expect } from 'chai';
import path from 'path';
import fs from 'fs';
import { get } from 'lodash';

import toFolders from '../../src/to-folders';


describe('TO FOLDERS EXAMPLE', () => {
  describe('toFolders(rootFolder, target, locale)', () => {
    const rootFolder = '../mock/config/generated/sections';
    const targetFile = 'en_to.yml';
    const rootPath = path.resolve(__dirname, rootFolder);
    const targetFilePath = path.resolve(__dirname, targetFile);

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
      desiredQuick = {
        "quick": "Veloce %{cammina}",
        "service": "Servizio %{ciao}",
        "haha": "fsdflkj"
      };
    });

    it('should take the contents of the target file and update the manifests (root)', () => {
      const sections = toFolders(rootPath, en, 'en_to');
      const updatedManifest = get(sections, 'manifest');
      const updatedQuick = get(sections, 'order.quick-services.index');
      expect(updatedManifest).to.deep.equal(desiredManifest);
      expect(updatedQuick).to.deep.equal(desiredQuick);
    });

  });
});
