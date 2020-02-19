var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('signup/index');
});

router.post('/', function(req, res){
    if(req.body.username == req.body.password){
        res.redirect('/signup');
    }
    else{
        res.send('Invalid Username or Password');
    }
});

module.exports = router;