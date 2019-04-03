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

router.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
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
  let key = req.body.key;
  storage = req.session;
  console.log("value: ",req.body.value)
  if(storage.user){
    Review.findOneAndUpdate(
        {key}, 
        { $push: { 
                  value: req.body.value[0]
                } 
        }, { upsert: true, new: true},function(err, data){
          console.log("myData: ",data);
            if(err){
              console.log('THIS IS ERROR RESPONSE')
              res.render('error',{data: error});
            }
            console.log(data);
            res.send(data);
        })
    }
  else{
    res.redirect('/')
  } 
});

router.get('/search',function (req,res,next) {
  storage = req.session;
  if(storage.user){
    let val = req.query.val;
    let url = 'search?entity_id=4&entity_type=city&q='+val;
    ZomatoApi(null,url).then((data) => {
      res.json(data)
    })
  }
  else{
    res.redirect('/')
  }
});
router.get('/restaurant',function (req,res,next) {
  let key = req.query.id;
  var restaurantData;
  storage = req.session;
  if(storage.user){
    ZomatoApi(null,'restaurant?res_id='+key).then((data) => {
      restaurantData = data;
      Review.findOne({key}, function(error, reviews) {
        if(reviews){
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
  storage = req.session;
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
