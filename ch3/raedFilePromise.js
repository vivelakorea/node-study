const fs = require('fs').promises;

// fs.readFile('./readme.txt')
//     .then((data) => {
//       console.log(data);
//       console.log(data.toString());
//     })
//     .catch((e) => console.error(e));

(async () => {
  try {
    const data = await fs.readFile('./readme.txt');
    console.log(data, data.toString());
  } catch (e) {
    console.error(e);
  }
})();
