const fs = require('fs');

console.log('start');
let data = fs.readFileSync('./readme2.txt');
console.log('first', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('second', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('third', data.toString());
console.log('end');