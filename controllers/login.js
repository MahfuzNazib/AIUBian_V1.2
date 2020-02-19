var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('login/index');
});

router.post('/', function(req, res){
    // if(req.body.userName == req.body.password){
    //     res.redirect('/signup');
    // }
    if(req.body.userName == "Admin" && req.body.password == "Admin"){
        res.redirect('/adminhome');
    }
    
    else if(req.body.userName == "111" && req.body.password == "111"){
        res.redirect('/studentHome');
    }
    else{
        res.send('Invalid Username or Password');
    }
});

module.exports = router;