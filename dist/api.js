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

function request(method, url, key, data) {
  return new Promise(function (resolve, reject) {
    console.log(url);
    var fullUrl = localeapp + '/v1/projects/' + key + '/' + url.replace(/^\//, '');
    console.log('fullurl', fullUrl);

    (0, _request2.default)({
      method: method,
      url: fullUrl,
      formData: data ? {
        file: data
      } : null
    }, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve({ response: response, body: body });
      }
    });
  });
}

function localeappPull(key) {
  return request('GET', '/translations/all.yml', key);
};

function localeappPush(key, file) {
  return request('POST', '/import', key, file);
};