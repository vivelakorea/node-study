const fs = require('fs').promises;

fs.readdir('./newfolder')
    .then((dir) => {
        console.log('폴더 내용 확인: ', dir);
        return fs.unlink('./newfolder/newFile.json');
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./newfolder');
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });


