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

function lokaliseSort(a, b) {
  if (pluralForms.includes(a)) {
    // handle plural forms
    console.log(a, b);
    return pluralForms.indexOf(a) - pluralForms.indexOf(b);
  }
  return a.localeCompare(b);
}

function jsonToYml(json, format) {
  return _jsYaml2.default.dump(json, {
    sortKeys: lokaliseSort,
    lineWidth: -1,
    noCompatMode: true,
    scalarQuoteStyle: format === undefined ? 'lokalise' : null
  });
}

function ymlToJson(yml) {
  return _jsYaml2.default.safeLoad(yml, null, null, 'JSON_SCHEMA');
}