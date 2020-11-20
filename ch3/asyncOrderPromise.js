const fs = require('fs').promises;

console.log('start');
fs.readFile('./readme2.txt')
    .then((data) => {
      console.log('first', String(data));
      return fs.readFile('./readme2.txt');
    })
    .then((data) => {
      console.log('second', String(data));
      return fs.readFile('./readme2.txt');
    })
    .then((data) => {
      console.log('third', String(data));
    })
    .catch((e) => console.error(e));

