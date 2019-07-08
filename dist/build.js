'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function build(rootFolder, targetPath, locale) {
  var finalTranslation = (0, _utils.fromFolders)(rootFolder, locale);
  try {
    _fs2.default.writeFileSync(targetPath + '/' + locale + '.yml', finalTranslation); // file type is hardcoded for now
    console.log('Updated target file ' + locale + '.yml');
  } catch (err) {
    console.error(err);
  }
  return finalTranslation;
}