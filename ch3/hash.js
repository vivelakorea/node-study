/* eslint-disable max-len */
const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('nopqrst').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('password').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('abcdefgh').digest('base64'));
