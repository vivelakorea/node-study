const url = require('url');
const querystring = require('querystring');

const query = querystring.parse(
    url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript').query,
);

console.log('querystring.parse():', query);
console.log('querystring.stringify():', querystring.stringify(query));

console.log(query.page);
