'use strict';

var fs = require('fs');
var path = require('path');

var _require = require('lodash'),
    includes = _require.includes;

function dirTree(dirPath, extensions) {
  var name = path.basename(dirPath);
  var item = { path: dirPath, name: name };

  var stats = void 0;
  try {
    stats = fs.statSync(dirPath);
  } catch (err) {
    return null;
  }

  if (stats.isFile() && !name.startsWith('.')) {
    var ext = path.extname(dirPath).toLowerCase().slice(1);
    if (extensions && !includes(extensions, ext)) {
      return null;
    }
    item.extension = ext;
  } else if (stats.isDirectory()) {
    try {
      item.children = fs.readdirSync(dirPath).map(function (child) {
        return dirTree(path.join(dirPath, child), extensions);
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
        content: fs.readFileSync(obj.path, 'utf8')
      });
    }
  }
}

module.exports = function getSectionsTree(dir) {
  return getContents(dirTree(dir));
};