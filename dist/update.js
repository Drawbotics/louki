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
  try {
    var compiledLocale = _fs2.default.readFileSync(targetPath + '/' + locale + '.yml', 'utf8');
    var updatedFolders = (0, _utils.toFolders)(rootFolder, compiledLocale, locale);
    console.log('Folders updated');
    return updatedFolders;
  } catch (err) {
    console.error(err);
  }
}