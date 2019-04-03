var express = require('express');
var router = express.Router();
const User = require('../modal/usersSchema');
const Review = require('../modal/reviewsSchema')
const ZomatoApi = require('../controllers/zomato');
var userInfo;
/* GET users listing. */
var storage;
router.post('/signup', function(req, res, next) {
  User.create(req.body).then(function(data){
    res.send(data);  
  });
});

router.post('/signin', function(req, res, next) {
      User.findOne(req.body, function(error, user) {
        console.log("session: ",req.session);
        console.log('User found ');
        // In case the user not found   
        if(error) {
          console.log('THIS IS ERROR RESPONSE')
          res.render('error',{data: error});
        } 
        if (user && user.password === req.body.password){
          console.log('User and password is correct');
          storage = req.session;
          storage.user = user;
          userInfo = user;
          res.redirect('/users/home');
        } else {
          console.log("Credentials wrong");
          res.render('error',{data: "Login invalid"});
        }   
    });
});

router.post('/reviews', function(req, res, next) {
  // console.log("hello",req.params,req.body,req.query);
  Review.create(req.body).then(function(data){
    console.log("data: ",data);
    res.send(data);  
  });
  // res.send(req.body); 
});

router.get('/search',function (req,res,next) {
  let val = req.query.val;
  let url = 'search?entity_id=4&entity_type=city&q='+val;
  ZomatoApi(null,url).then((data) => {
    res.json(data)
  })
});
router.get('/restaurant',function (req,res,next) {
  let key = req.query.id;
  var restaurantData;
  storage = req.session;
  if(storage.user){
    ZomatoApi(null,'restaurant?res_id='+key).then((data) => {
      restaurantData = data;
      Review.findOne({key}, function(error, reviews) {
        console.log("reviews", reviews);
        if(reviews){
          console.log("reviews", reviews)
          res.render('restaurant', {"restaurantDetails": restaurantData, "userInfo": userInfo, "reviews": reviews});
        }
        res.render('restaurant', {"restaurantDetails": restaurantData, "userInfo": userInfo, "reviews": [] });
      })
      // res.render('restaurant', {"restaurantDetails": restaurantData, "userInfo": userInfo})
    })
  }
  else{
    res.redirect('/');
  }
  
});
router.get('/home',function(req,res,next){
  console.log("I am here")
  storage = req.session;
  console.log("homeStorage: ",storage)
  if(storage.user){
    let user = storage.user;
    ZomatoApi(req.query).then((data) => {
      res.render('home',{restaurantData: data, users: user});
    })
  }
  else{
    res.redirect('/');
  }
})

module.exports = router;
