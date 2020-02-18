import yaml from '@nicmosc/js-yaml';


const pluralForms = ['zero', 'one', 'two', 'few', 'many', 'other'];


function lokaliseSort(a, b, object) {
  const aValue = object[a];
  const bValue = object[b];

  if (pluralForms.includes(a)) {  // handle plural forms
    return pluralForms.indexOf(a) - pluralForms.indexOf(b);
  }
  if (b.startsWith(a) && b.split('_')[0] === a
    && (typeof bValue !== 'string' || typeof aValue !== 'string')) {  // handle e.g. project vs project_item
    console.log(a, typeof aValue,b,  typeof bValue);
    return 1;
  }
  if (a.startsWith(b) && a.split('_')[0] === b
    && (typeof bValue !== 'string' || typeof aValue !== 'string')) {  // handle e.g. project vs project_item
    return -1;
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
