import yaml from 'js-yaml';


export function jsonToYml(json) {
  return yaml.safeDump(json);
}


export function ymlToJson(yml) {
  return yaml.safeLoad(yml);
}
