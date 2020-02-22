var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('adminhome/index');
});

router.get('/allPosts', function(req, res){
    res.render('adminhome/posts');
});

router.get('/chat', function(req, res){
    res.render('adminhome/chat');
});

router.get('/profile', function(req, res){
    res.render('adminhome/profile');
});

router.get('/editProfile', function(req, res){
    res.render('adminhome/editProfile');
});


module.exports = router;