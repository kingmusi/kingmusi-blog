var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.username = 'kingmusi'
  res.send('登录成功');
});

module.exports = router;
