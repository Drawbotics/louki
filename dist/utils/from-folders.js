'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = fromFolders;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _getSectionsTree2 = require('./get-sections-tree');

var _getSectionsTree3 = _interopRequireDefault(_getSectionsTree2);

var _conversion = require('./conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseTree(rootFolder) {
  var _getSectionsTree = (0, _getSectionsTree3.default)(rootFolder),
      children = _getSectionsTree.children;

  var manifestFile = (0, _lodash.find)(children, { extension: 'json' });
  var final = {};

  if (manifestFile) {
    var manifest = JSON.parse(manifestFile.content);
    for (var key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        var val = manifest[key];
        var matchExample = val.match(/{{(.*)}}/);

        if (!(0, _lodash.isEmpty)(matchExample)) {
          var folder = matchExample[1];
          Object.assign(final, _defineProperty({}, key, parseTree(rootFolder + '/' + folder)));
        } else {
          Object.assign(final, _defineProperty({}, key, val));
        }
      }
    }
  }

  var files = (0, _lodash.filter)(children, { extension: 'yml' });
  if (files) {
    files.map(function (f) {
      var translations = (0, _conversion.ymlToJson)(f.content);
      var name = f.name.split('.')[0];
      if (name === 'index') {
        Object.assign(final, _extends({}, translations));
      } else {
        Object.assign(final, _defineProperty({}, name, translations));
      }
    });
  }

  return final;
}

function fromFolders(rootFolder, locale) {
  var result = Object.assign({}, _defineProperty({}, locale, parseTree(rootFolder)));
  return (0, _conversion.jsonToYml)(result);
}