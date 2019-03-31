var express = require('express');
var router = express.Router();
const User = require('../models/schema');
const ZomatoApi = require('../controllers/zomato');

/* GET users listing. */

router.post('/signup', function(req, res, next) {
  User.create(req.body).then(function(data){
    res.send(data);  
  });
});
router.post('/signin', function(req, res, next) {
    //res.send(req.body);
    User.findOne(req.body, function(error, user) {
      console.log('User found ');
      // In case the user not found   
      if(error) {
        console.log('THIS IS ERROR RESPONSE')
        res.render('error',{data: error});
        // res.json(err)
      } 
      if (user && user.password === req.body.password){
        console.log('User and password is correct');
          res.render('login',{userData: user});
          //res.json(data)
        //res.render('login',{data: user});
        console.log(user);
        //res.json(user)
      } else {
        console.log("Credentials wrong");
        res.render('error',{data: "Login invalid"});
        //res.json({data: "Login invalid"});
      }   
  });
});
router.get('/signin.json', function(req, res, next) {
  ZomatoApi(req.query).then((data) => {
    res.json(data)
  })
});
router.get('/search',function (params) {
  ZomatoApi(req.query).then((data) => {
    res.json(data)
  })
});


module.exports = router;
