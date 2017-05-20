'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localeappPull = localeappPull;
exports.localeappPush = localeappPush;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localeapp = 'https://api.localeapp.com';

function request(type, url, key) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return new Promise(function (resolve, reject) {
    console.log(url);
    var fullUrl = localeapp + '/v1/projects/' + key + '/' + url.replace(/^\//, '');
    console.log(fullUrl);

    _request2.default.get(fullUrl, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve({ response: response, body: body });
      }
    });
  });
};

function localeappPull(key) {
  return request('GET', '/translations/all.yml', key);
};

function localeappPush(key, file) {};