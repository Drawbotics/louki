'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFolders = exports.fromFolders = undefined;

var _api = require('./api');

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});

var _conversion = require('./conversion');

Object.keys(_conversion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _conversion[key];
    }
  });
});
exports.getConfigPath = getConfigPath;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fromFolders2 = require('./from-folders');

var _fromFolders3 = _interopRequireDefault(_fromFolders2);

var _toFolders2 = require('./to-folders');

var _toFolders3 = _interopRequireDefault(_toFolders2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fromFolders = _fromFolders3.default;
exports.toFolders = _toFolders3.default;
function getConfigPath() {
  var create = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var home = require('user-home');
  var directory = home + '/.louki';
  if (!_fs2.default.existsSync(directory) && create) {
    _fs2.default.mkdirSync(directory);
  }
  return directory + '/config';
}