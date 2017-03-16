import { expect } from 'chai';
import path from 'path';

import awesome from '../../src';


describe('AWESOME EXAMPLE', function() {

  const rootFolder = 'mock/config/sections';
  const targetFolder = 'mock/dist';

  before(function() {
  });

  describe('after calling the main function', function() {
    it('the generated yml file should contain all contents of the folders', function() {
      awesome(path.resolve(__dirname, rootFolder), path.resolve(__dirname, targetFolder));
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
