'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = awesome;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fromFolders = require('./from-folders');

var _fromFolders2 = _interopRequireDefault(_fromFolders);

var _toFolders = require('./to-folders');

var _toFolders2 = _interopRequireDefault(_toFolders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  AVAILABLE COMMANDS:
  - update : will parse the translations from the root folder provided and replae
    the contents of dist with the new translation (only the default local will be replaced)
  - push : will call update and then through localeapp it will push the final yml file (default local only again)
  - pull : will retrieve the data from localeapp and replace the contents of dist with those files, it will
    also disect the large translation file (en.yml) and replace the contents of the index files.
**/

// remember to add try catch for file operations
function update(rootFolder, targetFile) {
  var finalTranslation = (0, _fromFolders2.default)(rootFolder);
  try {
    _fs2.default.writeFileSync(targetFile, finalTranslation);
  } catch (err) {
    console.error(err);
  }
  return finalTranslation;
}

function push(rootFolder, targetFile) {
  update(rootFolder, targetFile);
  // do some promise thing and then...
  // command to push to localeapp (only the target file)
}

function pull(rootFolder, targetFile, locale) {
  var updatedFolders = (0, _toFolders2.default)(rootFolder, targetFile, locale);
  return updatedFolders;
}

function awesome(command, rootFolder) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var defaultLocale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'en';
  // this must be set somewhere
  if (command === 'update') {
    return update(rootFolder, target);
  } else if (command === 'push') {
    return push(rootFolder, target);
  } else if (command === 'pull') {
    return pull(rootFolder, target, defaultLocale); // here the target is the target folder
  }
}