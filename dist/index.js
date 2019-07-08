'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = louki;

var _nodeWatch = require('node-watch');

var _nodeWatch2 = _interopRequireDefault(_nodeWatch);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  AVAILABLE COMMANDS:
  - build : will parse the translations from the root folder provided and replace
    the contents of dist with the new translation (only the default local will be replaced)
  - update : will disect the large translation file ([default].yml) and replace the contents of the index files
**/

function louki(command, rootFolder, targetPath, option) {
  var extra = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var watchFiles = extra.watchFiles;

  var defaultLocale = option;
  if (command === 'build') {
    if (watchFiles) {
      console.log('Louki watching for changes in root folder...');
      (0, _update2.default)(rootFolder, targetPath, defaultLocale); // run once
      (0, _nodeWatch2.default)(rootFolder, { recursive: true, filter: /\.(json|yml)$/ }, function (evt, fileName) {
        console.log(evt, fileName.replace(rootFolder, ''));
        return (0, _build2.default)(rootFolder, targetPath, defaultLocale);
      });
    } else {
      return (0, _build2.default)(rootFolder, targetPath, defaultLocale);
    }
  } else if (command === 'update') {
    return (0, _update2.default)(rootFolder, targetPath, defaultLocale);
  } else {
    console.error('Command not found');
    return;
  }
}