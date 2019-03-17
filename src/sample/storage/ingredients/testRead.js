const fs            = require('fs');
const path          = require('path');

const cacheFolder = path.join(__dirname, '../../../../cache/ingredients');

const dictionary = fs.readFileSync(path.join(cacheFolder, 'dictionary.json'), 'utf-8');

console.warn(JSON.parse(dictionary));