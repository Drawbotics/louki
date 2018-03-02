'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configPath = _path2.default.resolve(__dirname, '../.config');

function init(key) {
  var value = 'LOCALEAPP_KEY="' + key + '"';
  _fs2.default.open(configPath, 'w', function (err, fd) {
    if (err) throw err;
    _fs2.default.write(fd, value, function (err, written) {
      if (err) {
        console.error('Could not save key');
        throw err;
      }
      console.log('Successfully saved localeapp key');
    });
  });
}