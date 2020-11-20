const fetch = require('node-fetch');
const cheerio = require('cheerio');
fetch('https://google.com')
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      const $ = cheerio.load(data);
      console.log($($('a')[0]).text());
    });
