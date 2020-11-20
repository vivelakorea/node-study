const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
  console.log(data.toString());
});
