var express = require('express');
var router = express.Router();
const db = require('../models/schema');

/* GET users listing. */

router.post('/signup', function(req, res, next) {
  db.create(req.body).then(function(data){
    res.send(data);
  });
});
router.post('/signin', function(req, res, next) {
    res.send(req.body);
});

module.exports = router;
