'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.jsonToYml = jsonToYml;
exports.ymlToJson = ymlToJson;

var _jsYaml = require('@nicmosc/js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluralForms = ['zero', 'one', 'two', 'few', 'many', 'other'];

function lokaliseSort(a, b, object) {
  var aValue = object[a];
  var bValue = object[b];

  if (pluralForms.includes(a)) {
    // handle plural forms
    return pluralForms.indexOf(a) - pluralForms.indexOf(b);
  }
  if (b.startsWith(a) && b.split('_')[0] === a && (typeof bValue !== 'string' || typeof aValue !== 'string')) {
    // handle e.g. project vs project_item
    console.log(a, typeof aValue === 'undefined' ? 'undefined' : _typeof(aValue), b, typeof bValue === 'undefined' ? 'undefined' : _typeof(bValue));
    return 1;
  }
  if (a.startsWith(b) && a.split('_')[0] === b && (typeof bValue !== 'string' || typeof aValue !== 'string')) {
    // handle e.g. project vs project_item
    return -1;
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