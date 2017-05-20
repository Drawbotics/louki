'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = louki;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _fromFolders = require('./from-folders');

var _fromFolders2 = _interopRequireDefault(_fromFolders);

var _toFolders = require('./to-folders');

var _toFolders2 = _interopRequireDefault(_toFolders);

var _utils = require('./utils');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
  AVAILABLE COMMANDS:
  - update : will parse the translations from the root folder provided and replae
    the contents of dist with the new translation (only the default local will be replaced)
  - push : will call update and then through localeapp it will push the final yml file (default local only again)
  - pull : will retrieve the data from localeapp and replace the contents of dist with those files, it will
    also disect the large translation file (en.yml) and replace the contents of the index files.
**/

// remember to add try catch for file operations
function update(rootFolder, targetPath, locale) {
  var finalTranslation = (0, _fromFolders2.default)(rootFolder, locale);
  try {
    _fs2.default.writeFileSync(targetPath + '/' + locale + '.yml', finalTranslation); // file type is hardcoded for now
  } catch (err) {
    console.error(err);
  }
  return finalTranslation;
}

function push(rootFolder, targetPath, locale) {
  update(rootFolder, targetPath, locale);

  var localeappKey = (0, _get2.default)(_dotenv2.default.config(), 'parsed.LOCALEAPP_KEY', null);

  if (!localeappKey) {
    console.error('No localeapp project key found in .env! Please specify one');
  } else {
    var data = _fs2.default.createReadStream(targetPath + '/' + locale + '.yml');
    (0, _api.localeappPush)(localeappKey, data).then(function (_ref) {
      var response = _ref.response,
          body = _ref.body;

      console.log(body);
    }).catch(function (err) {
      return console.error(err);
    });
  }
}

function pull(rootFolder, targetPath, locale) {

  var localeappKey = (0, _get2.default)(_dotenv2.default.config(), 'parsed.LOCALEAPP_KEY', null);

  if (!localeappKey) {
    console.error('No localeapp project key found in .env! Please specify one');
  } else {
    var allTrans = (0, _api.localeappPull)(localeappKey).then(function (_ref2) {
      var response = _ref2.response,
          body = _ref2.body;

      var localesArray = (0, _utils.ymlToJson)(body);
      Object.entries(localesArray).map(function (l) {
        var ymlLocale = (0, _utils.jsonToYml)(_defineProperty({}, l[0], l[1]));
        _fs2.default.writeFileSync(targetPath + '/' + l[0] + '.yml', ymlLocale);
      });
    }).catch(function (err) {
      return console.error(err);
    });;
    var compiledLocale = _fs2.default.readFileSync(targetPath + '/' + locale + '.yml', 'utf8');
    var updatedFolders = (0, _toFolders2.default)(rootFolder, compiledLocale, locale);
    return updatedFolders;
  }
  return;
}

function louki(command, rootFolder, targetPath, defaultLocale) {
  if (command === 'update') {
    return update(rootFolder, targetPath, defaultLocale);
  } else if (command === 'push') {
    return push(rootFolder, targetPath, defaultLocale);
  } else if (command === 'pull') {
    return pull(rootFolder, targetPath, defaultLocale);
  } else {
    console.error('Command not found');
    return;
  }
}