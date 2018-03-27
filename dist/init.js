'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(key) {
  var value = 'LOCALEAPP_KEY="' + key + '"';
  var configPath = (0, _utils.getConfigPath)(true);
  _fs2.default.open(configPath, 'w', function (err, fd) {
    if (err) {
      _fs2.default.writeFile(configPath, '', function (err) {
        if (err) throw err;
        writeConfig(fd, value);
      });
    } else {
      writeConfig(fd, value);
    }
  });
}

function writeConfig(fd, value) {
  _fs2.default.write(fd, value, function (err, written) {
    if (err) {
      console.error('Could not save key');
      throw err;
    }
    console.log('Successfully saved localeapp key');
  });
}