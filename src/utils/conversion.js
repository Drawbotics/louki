import yaml from '@nicmosc/js-yaml';


const pluralForms = ['zero', 'one', 'two', 'few', 'many', 'other'];


function lokaliseSort(a, b) {
  if (pluralForms.includes(a)) {  // handle plural forms
    console.log(a, b);
    return pluralForms.indexOf(a) - pluralForms.indexOf(b);
  }
  return a.localeCompare(b);
}


export function jsonToYml(json, format) {
  return yaml.dump(json, {
    sortKeys: lokaliseSort,
    lineWidth: -1,
    noCompatMode: true,
    scalarQuoteStyle: format === undefined ? 'lokalise' : null,
  });
}


export function ymlToJson(yml) {
  return yaml.safeLoad(yml, null, null, 'JSON_SCHEMA');
}
