var express = require('express');
var router = express.Router();
const User = require('../modal/usersSchema');
const Review = require('../modal/reviewsSchema')
const ZomatoApi = require('../controllers/zomato');
var userInfo;
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
      } 
      if (user && user.password === req.body.password){
        console.log('User and password is correct');
        userInfo = user;
        ZomatoApi(req.query).then((data) => {
          res.render('home',{restaurantData: data, users: user});
        })
          
      } else {
        console.log("Credentials wrong");
        res.render('error',{data: "Login invalid"});
      }   
  });
});
router.post('/reviews', function(req, res, next) {
  console.log("hello",req.params,req.body,req.query);
  // Review.create(req.body).then(function(data){
  //   res.send(data);  
  // });
  res.json(req.query);
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
    console.log("info",userInfo)
    res.render('restaurant', {"myVar": restaurantData, "userInfo": userInfo});
  })
});



module.exports = router;
