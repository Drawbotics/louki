import yaml from 'js-yaml';


export function jsonToYml(json) {
  return yaml.safeDump(json, { sortKeys: true, lineWidth: -1 });
}


export function ymlToJson(yml) {
  return yaml.safeLoad(yml, null, null, 'JSON_SCHEMA');
}
