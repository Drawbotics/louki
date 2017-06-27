'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = push;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _utils = require('./utils');

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function push(rootFolder, targetPath, locale, pushDefault) {
  var raw = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (pushDefault && !raw) {
    (0, _update2.default)(rootFolder, targetPath, locale); // only build if default locale is pushed
  }
  var localeappKey = (0, _get2.default)(_dotenv2.default.config(), 'parsed.LOCALEAPP_KEY', null);
  if (!localeappKey) {
    console.error('No localeapp project key found in .env! Please specify one');
  } else {
    var filePath = targetPath + '/' + locale + '.yml';
    var data = _fs2.default.createReadStream(filePath);
    return (0, _utils.localeappPush)(localeappKey, data).then(function (_ref) {
      var response = _ref.response,
          body = _ref.body;

      console.log('Successfully pushed ' + locale + '.yml to Localeapp');
    }).catch(function (err) {
      return console.error(err);
    });
  }
}