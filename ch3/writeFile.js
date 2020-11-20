const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다')
    .then(() => {
      return fs.readFile('./writeme.txt');
    })
    .then((data) => {
      console.log(data.toString());
    })
    .catch((e) => {
      console.error(e);
    });

// (async () => {
//   try {
//     const result = await fs.writeFile('./writeme.txt', '글이 입력됩니다');
//     result === undefined;
//     const data = await fs.readFile('./writeme.txt');
//     console.log(data.toString());
//   } catch (e) {
//     console.error(e);
//   }
// })();

