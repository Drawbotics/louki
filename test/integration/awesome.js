import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import awesome from '../../src';


describe('AWESOME EXAMPLE', function() {

  const rootFolder = 'mock/config/sections';
  const targetFolder = 'mock/dist';
  const en = fs.readFileSync(path.resolve(__dirname, 'en.yml'), 'utf8');

  before(function() {
  });

  describe('after calling the main function', function() {
    it('the generated yml file should contain all contents of the folders', function() {
      const fullRootPath = path.resolve(__dirname, rootFolder);
      const fullTargetPath = path.resolve(__dirname, targetFolder);
      expect(awesome(fullRootPath, fullTargetPath)).to.equal(en);
    });
    // it('should run the main function again when encountering a manifest', function() {
    //
    // });
    // it('the loop should stop when no manifest is present and return its contents', function() {
    //
    // });
    // it('should simply return a string key when a folder is not defined (with {{ }})', function() {
    //
    // });
  });
});
