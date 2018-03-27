'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pull;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pull(rootFolder, targetPath, locale) {
  var raw = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  try {
    var configPath = (0, _utils.getConfigPath)();
    var localeappKey = _fs2.default.readFileSync(configPath, 'utf8').split('=')[1].replace(/"/g, '');
    return (0, _utils.localeappPull)(localeappKey).then(function (_ref) {
      var response = _ref.response,
          body = _ref.body;

      var localesArray = (0, _utils.ymlToJson)(body);
      console.log('Successfully pulled locales ' + Object.keys(localesArray).join(', ') + ' from Localeapp');
      Object.entries(localesArray).map(function (l) {
        var ymlLocale = (0, _utils.jsonToYml)(_defineProperty({}, l[0], l[1]));
        _fs2.default.writeFileSync(targetPath + '/' + l[0] + '.yml', ymlLocale);
      });
      if (raw) return {};
      var compiledLocale = _fs2.default.readFileSync(targetPath + '/' + locale + '.yml', 'utf8');
      var updatedFolders = (0, _utils.toFolders)(rootFolder, compiledLocale, locale);
      console.log('Folders updated');
      return updatedFolders;
    }).catch(function (err) {
      return console.error(err);
    });
  } catch (err) {
    console.error('No localeapp project key found in! Please specify one with the init command');
  }
}