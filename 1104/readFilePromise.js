const fs = require('fs').promises;

(async () => {
  try {
    const data = fs.readFile('./readme.txt');
    console.log(data);
    console.log(data.toString());
  } catch (e) {
    console.error(e);
  }
})();

