'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToYml = jsonToYml;
exports.ymlToJson = ymlToJson;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jsonToYml(json) {
  return _jsYaml2.default.safeDump(json);
}

function ymlToJson(yml) {
  return _jsYaml2.default.safeLoad(yml, null, null, 'JSON_SCHEMA');
}