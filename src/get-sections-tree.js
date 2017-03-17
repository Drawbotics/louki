const fs = require('fs');
const path = require('path');
const { includes } = require('lodash');


function dirTree(dirPath, extensions) {
  const name = path.basename(dirPath);
  const item = { path: dirPath, name };

  let stats;
  try {
    stats = fs.statSync(dirPath);
  }
  catch (err) {
    return null;
  }

  if (stats.isFile() && !name.startsWith('.')) {
    const ext = path.extname(dirPath).toLowerCase().slice(1);
    if (extensions && ! includes(extensions, ext)){
      return null;
    }
    item.extension = ext;
  }
  else if (stats.isDirectory()) {
    try {
      item.children = fs.readdirSync(dirPath)
        .map(child => dirTree(path.join(dirPath, child), extensions))
        .filter(e => !!e);
    }
    catch(err) {
      if (err.code == "EACCES") {
        return null;
      }
    }
  }
  else {
    return null;
  }

  return item;
}


function getContents(obj) {
  if (obj instanceof Array) {
    return obj.map(getContents);
  }
  else {
    if (obj.children){
      return Object.assign({}, obj, {
        children: getContents(obj.children),
      });
    }
    else {
      return Object.assign({}, obj, {
        content: fs.readFileSync(obj.path, 'utf8'),
      });
    }
  }
}


module.exports = function getSectionsTree(dir) {
  return getContents(dirTree(dir));
};
