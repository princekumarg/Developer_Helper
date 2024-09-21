const crypto = require('crypto');
const hash = crypto.createHash('sha256');
hash.update('myPassword123');
console.log(hash.digest('hex'));