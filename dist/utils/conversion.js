'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToYml = jsonToYml;
exports.ymlToJson = ymlToJson;

var _jsYaml = require('@nicmosc/js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jsonToYml(json, format) {
  return _jsYaml2.default.dump(json, {
    sortKeys: true,
    lineWidth: -1,
    noCompatMode: true,
    scalarQuoteStyle: format === undefined ? 'lokalise' : null
  });
}

function ymlToJson(yml) {
  return _jsYaml2.default.safeLoad(yml, null, null, 'JSON_SCHEMA');
}