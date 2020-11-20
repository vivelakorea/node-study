const http = require('http');

http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>hello node!</h1>');
  res.end('<p>hello server</p>');
}).listen(8080, () => {
  console.log('✅ listening on: http://localhost:8080');
});


http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>hello node!</h1>');
  res.end('<p>hello server</p>');
}).listen(8081, () => {
  console.log('✅ listening on: http://localhost:8081');
});

