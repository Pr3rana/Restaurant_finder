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
router.get('/signin.json', function(req, res, next) {
  ZomatoApi(req.query).then((data) => {
    res.json(data)
  })
});
router.post('/signin', function(req, res, next) {
    //res.send(req.body);
    User.findOne(req.body, function(error, user) {
      console.log('User found ');
      // In case the user not found   
      if(error) {
        console.log('THIS IS ERROR RESPONSE')
        res.render('error',{data: error});
      } 
      if (user && user.password === req.body.password){
        console.log('User and password is correct');
          res.render('login',{userData: user});
      } else {
        console.log("Credentials wrong");
        res.render('error',{data: "Login invalid"});
      }   
  });
});

router.get('/search',function (req,res,next) {
  let val = req.query.val;
  let url = 'search?entity_id=4&entity_type=city&q='+val;
  ZomatoApi(null,url).then((data) => {
    res.json(data)
  })
});
router.get('/restaurant',function (req,res,next) {
  let id = req.query.id;
  var restaurantData;
  ZomatoApi(null,'restaurant?res_id='+id).then((data) => {
    restaurantData = data;
    res.render('restaurant', {
      myVar: restaurantData
  });
  })
});



module.exports = router;
