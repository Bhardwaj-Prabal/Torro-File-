const { createRequire } = require('module');
const require = createRequire(import.meta.url);

const bencode = require('bencode');  // Now use in CommonJS context
module.exports = bencode;