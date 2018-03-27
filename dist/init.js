'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function init(key) {
  var configPath = (0, _utils.getConfigPath)(true);
  var projectName = (0, _utils.getProjectName)();
  var existingKeys = {};
  try {
    existingKeys = JSON.parse(_fs2.default.readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.log('No previous keys');
  }
  var combined = _extends({}, existingKeys, _defineProperty({}, projectName, key));
  _fs2.default.open(configPath, 'w', function (err, fd) {
    if (err) {
      _fs2.default.writeFile(configPath, '', function (err) {
        if (err) throw err;
        writeConfig(fd, combined);
      });
    } else {
      writeConfig(fd, combined);
    }
  });
}

function writeConfig(fd, keys) {
  _fs2.default.write(fd, JSON.stringify(keys), function (err, written) {
    if (err) {
      console.error('Could not save key');
      throw err;
    }
    console.log('Successfully saved localeapp key');
  });
}