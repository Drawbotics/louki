'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = update;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function update(rootFolder, targetPath, locale) {
  var finalTranslation = (0, _utils.fromFolders)(rootFolder, locale);
  try {
    _fs2.default.writeFileSync(targetPath + '/' + locale + '.yml', finalTranslation); // file type is hardcoded for now
  } catch (err) {
    console.error(err);
  }
  return finalTranslation;
}