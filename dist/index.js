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
function update(rootFolder, targetPath, locale) {
  console.log(rootFolder);
  var finalTranslation = (0, _fromFolders2.default)(rootFolder);
  console.log(finalTranslation);
  try {
    _fs2.default.writeFileSync(targetPath + '/' + locale + '.yml', finalTranslation); // file type is hardcoded for now
  } catch (err) {
    console.error(err);
  }
  return finalTranslation;
}

function push(rootFolder, targetPath, locale) {
  update(rootFolder, targetFile);
  // do some promise thing and then...
  // command to push to localeapp (only the target file)
}

function pull(rootFolder, targetPath, locale) {
  var compiledLocale = _fs2.default.readFileSync(targetPath + '/' + locale + '.yml', 'utf8');
  var updatedFolders = (0, _toFolders2.default)(rootFolder, compiledLocale);
  return updatedFolders;
}

function awesome(command, rootFolder, targetPath) {
  var defaultLocale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'en';
  // this must be set somewhere
  if (command === 'update') {
    return update(rootFolder, targetPath, defaultLocale);
  } else if (command === 'push') {
    return push(rootFolder, targetPath, defaultLocale);
  } else if (command === 'pull') {
    return pull(rootFolder, targetPath, defaultLocale);
  } else {
    console.error('Command not found');
    return;
  }
}