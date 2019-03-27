var express = require('express');
var router = express.Router();
const User = require('../models/schema');

/* GET users listing. */

router.post('/signup', function(req, res, next) {
  User.create(req.body).then(function(data){
    res.send(data);
  });
});
router.post('/signin', function(req, res, next) {
    //res.send(req.body);
    User.findOne(req.body, function(err, user) {
      console.log('User found ');
      // In case the user not found   
      if(err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } 
      if (user && user.password === req.body.password){
        console.log('User and password is correct')
        res.json(user);
      } else {
        console.log("Credentials wrong");
        res.json({data: "Login invalid"});
      }              
  });
});

module.exports = router;
