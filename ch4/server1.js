const http = require('http');

http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>안녕, 노드!</h1>');
  //   const buffer = Buffer.from('hello buffer!qwertyuiopsdfghjkzxcvbnmqwertyuioasdfghjkzxcvbnqwertyudfghjcvbnwrtyuxcvb cvbfghcvbdvbvhjgvhgvchzxbvjsadnvasfdfkjashdfkvbajsdnjkncvkjasbvadnjknvckxzbvashdbvadsbfvaksvncnzkxjcnvasdbfdsncxzcvnkvjnakdsvnakvnabzvjzxcbvxzvbdlivnasdkfnasdfkbsagjdsabfmnzxbvcxzjkbbzvbsadlfbsadhfbsajvhabdbvajlhvb');
  //   res.write(buffer);
  res.write('<h2>안녕, 노드!노드!</h2>');
  res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => {
      console.log('8080번 포트에서 서버 대기 중입니다!');
    });
