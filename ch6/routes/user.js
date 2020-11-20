const express = require('express');

const router = express.Router();

// GET /user 라우터

router.get('/', (req, res) => {
  res.send('Hello, User');
});

router.route('/:id')
  .get((req, res) => {
    console.log(req.app, req.body, req.cookies, req.ip, req.params, req.query, req.signedCookies, req.app.get('port'));
    res.send(`hello ${req.params.id}`);
  })
  .post((req, res) => {
    console.log(req.app, req.body, req.cookies, req.ip, req.params, req.query, req.signedCookies, req.app.get('port'));
    res.send(`hello ${req.ip}`);
  });

module.exports = router;
