import yaml from '@nicmosc/js-yaml';


export function jsonToYml(json, format) {
  return yaml.dump(json, {
    sortKeys: true,
    lineWidth: -1,
    noCompatMode: true,
    scalarQuoteStyle: format === undefined ? 'lokalise' : null,
  });
}


export function ymlToJson(yml) {
  return yaml.safeLoad(yml, null, null, 'JSON_SCHEMA');
}
