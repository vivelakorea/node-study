const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.R_OK | constants.W_OK | constants.X_OK)
    .then(() => {
      return Promise.reject('이미 폴더 있음');
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        console.log('폴더 없음');
        return fs.mkdir('folder');
      } else {
        return Promise.reject(err);
      }
    })
    .then(() => {
        console.log('폴더 생성 성공');
        return fs.open('./folder/file.json', 'w');
    })
    .then((fd) => {
      console.log('빈 파일 생성 성공', 'fd : ', fd);
      return fs.mkdir('newfolder');
    })
    .then(() => {
      console.log('다른 폴더 생성 성공');
      return fs.writeFile('./folder/file.json', '{"txt": "이거 쓰고 폴더 바꿀거임", "next":   "이름도 바꿀거임",    "공백": "이따구로 쓰면 어케되지?"}')
    })
    .then(() => {
      console.log('빈 파일에 작성 완료')
      return fs.rename('./folder/file.json', './newfolder/newfile.json');
    })
    .then(() => {
      console.log('폴더 옮기고 파일명 변경 완료');
    })
    .catch((err) => {
      console.error(err);
    })