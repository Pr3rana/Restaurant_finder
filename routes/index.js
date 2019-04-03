var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("mystorage: ", req.session);
    req.session.destroy();
    req.session = null
    console.log("laststorage: ", req.session);
    // req.session.destroy(function(err){  
    //     if(err){  
    //         console.log(err);  
    //     }  
    //     else  
    //     {  
    //         res.render('index');
    //     }  
    // });  
    res.render('index');
    
  
});

module.exports = router;
