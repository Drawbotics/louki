'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dirTree(dirPath, extensions) {
  var name = _path2.default.basename(dirPath);
  var item = { path: dirPath, name: name };

  var stats = void 0;
  try {
    stats = _fs2.default.statSync(dirPath);
  } catch (err) {
    return null;
  }

  if (stats.isFile() && !name.startsWith('.')) {
    var ext = _path2.default.extname(dirPath).toLowerCase().slice(1);
    if (extensions && !(0, _includes2.default)(extensions, ext)) {
      return null;
    }
    item.extension = ext;
  } else if (stats.isDirectory()) {
    try {
      item.children = _fs2.default.readdirSync(dirPath).map(function (child) {
        return dirTree(_path2.default.join(dirPath, child), extensions);
      }).filter(function (e) {
        return !!e;
      });
    } catch (err) {
      if (err.code == "EACCES") {
        return null;
      }
    }
  } else {
    return null;
  }

  return item;
}

function getContents(obj) {
  if (obj instanceof Array) {
    return obj.map(getContents);
  } else {
    if (obj.children) {
      return Object.assign({}, obj, {
        children: getContents(obj.children)
      });
    } else {
      return Object.assign({}, obj, {
        content: _fs2.default.readFileSync(obj.path, 'utf8')
      });
    }
  }
}

module.exports = function getSectionsTree(dir) {
  return getContents(dirTree(dir));
};