'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToYml = jsonToYml;
exports.ymlToJson = ymlToJson;

var _jsYaml = require('@nicmosc/js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluralForms = ['zero', 'one', 'two', 'few', 'many', 'other'];

function lokaliseSort(a, b, object) {
  var aValue = object[a];
  var bValue = object[b];

  if (pluralForms.includes(a) && pluralForms.includes(b)) {
    // handle plural forms
    return pluralForms.indexOf(a) - pluralForms.indexOf(b);
  }
  if (b.startsWith(a) && typeof aValue !== 'string' && !Object.keys(aValue).every(function (k) {
    return pluralForms.includes(k);
  })) {
    // handle e.g. project vs project_item
    return 1;
  }
  if (a.startsWith(b) && typeof bValue !== 'string' && typeof aValue !== 'string') {
    // handle e.g. project vs project_item
    return -1;
  }
  return a.localeCompare(b);
}

function jsonToYml(json, format) {
  return _jsYaml2.default.dump(json, {
    sortKeys: lokaliseSort,
    lineWidth: -1,
    // noCompatMode: true,
    scalarQuoteStyle: format === undefined ? 'lokalise' : null
  });
}

function ymlToJson(yml) {
  return _jsYaml2.default.safeLoad(yml, null, null, 'JSON_SCHEMA');
}