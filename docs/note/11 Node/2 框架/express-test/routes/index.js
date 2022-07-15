var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel') 
const { getPassword } = require('../controller/indexs')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const { username } = req.query
  const password = await getPassword(username)
  res.json(
    new SuccessModel({ password })
  )
});

module.exports = router;
