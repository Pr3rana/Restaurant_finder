var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  //console.log(req.body,"req");
  res.send(req.body);
});

module.exports = router;
