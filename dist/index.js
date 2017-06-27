'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = louki;

var _nodeWatch = require('node-watch');

var _nodeWatch2 = _interopRequireDefault(_nodeWatch);

var _pull = require('./pull');

var _pull2 = _interopRequireDefault(_pull);

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  AVAILABLE COMMANDS:
  - update : will parse the translations from the root folder provided and replae
    the contents of dist with the new translation (only the default local will be replaced)
  - push : will call update and then through localeapp it will push the final yml file (default local only again)
  - pull : will retrieve the data from localeapp and replace the contents of dist with those files, it will
    also disect the large translation file (en.yml) and replace the contents of the index files.
**/

function louki(command, rootFolder, targetPath, defaultLocale, extra) {
  var pushDefault = extra.pushDefault,
      watchFiles = extra.watchFiles,
      raw = extra.raw;

  if (command === 'update') {
    if (watchFiles) {
      console.log('Louki watching for changes in root folder...');
      (0, _update2.default)(rootFolder, targetPath, defaultLocale); // run once
      (0, _nodeWatch2.default)(rootFolder, { recursive: true, filter: /\.(json|yml)$/ }, function (evt, fileName) {
        console.log(evt, fileName.replace(rootFolder, ''));
        return (0, _update2.default)(rootFolder, targetPath, defaultLocale);
      });
    } else {
      return (0, _update2.default)(rootFolder, targetPath, defaultLocale);
    }
  } else if (command === 'push') {
    return (0, _push2.default)(rootFolder, targetPath, defaultLocale, pushDefault);
  } else if (command === 'pull') {
    return (0, _pull2.default)(rootFolder, targetPath, defaultLocale, raw);
  } else {
    console.error('Command not found');
    return;
  }
}