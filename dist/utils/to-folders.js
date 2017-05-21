'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toFolders;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _getSectionsTree2 = require('./get-sections-tree');

var _getSectionsTree3 = _interopRequireDefault(_getSectionsTree2);

var _conversion = require('./conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseTranslation(json, rootFolder) {
  var _getSectionsTree = (0, _getSectionsTree3.default)(rootFolder),
      children = _getSectionsTree.children;

  var manifestFile = (0, _lodash.find)(children, { extension: 'json' });
  var final = {};

  if (manifestFile) {
    var manifest = JSON.parse(manifestFile.content);
    var newJson = {};

    for (var key in manifest) {
      if (manifest.hasOwnProperty(key)) {
        var val = manifest[key];
        var matchExample = val.match(/{{(.*)}}/);

        if (!(0, _lodash.isEmpty)(matchExample)) {
          Object.assign(newJson, _defineProperty({}, key, val));

          var folder = matchExample[1];

          // this we return
          Object.assign(final, _defineProperty({}, folder, parseTranslation(json[key], rootFolder + '/' + folder)));

          json = (0, _lodash.omit)(json, key); // deletes the folder key so that we are
          // left with only with simple keys
        } else {
          if (json[key]) {
            Object.assign(newJson, _defineProperty({}, key, json[key]));

            json = (0, _lodash.omit)(json, key);
          }
        }
      }
    }

    // now we are left only with simple keys, so add them to the manifest (newJson)
    // Object.assign(newJson, json);

    // add updated manifest to folder structure object
    Object.assign(final, {
      manifest: newJson
    });

    _fs2.default.writeFileSync(rootFolder + '/manifest.json', JSON.stringify(newJson, null, 2));
  }

  // now replace the rest in the manifest
  _fs2.default.writeFileSync(rootFolder + '/index.yml', (0, _conversion.jsonToYml)(json));

  // add new contents of the yml (not parsed)
  Object.assign(final, {
    index: json
  });

  return final;
}

function toFolders(rootFolder, target, locale) {
  var strippedTarget = (0, _conversion.ymlToJson)(target)[locale];
  return parseTranslation(strippedTarget, rootFolder);
}