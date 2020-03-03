var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('student/index');
});

router.get('/studentProfile', function(req, res){
    // res.render('student/studentProfile',{
    //     dept : 'CSE'
    // });
    res.render('student/studentProfile')
});


router.get('/editProfile', function(req, res){
    res.render('student/editProfile');
});

router.get('/timeLine', function(req, res){
    res.render('student/timeLine');
});

router.get('/chat', function(req, res){
    res.render('student/chat');
});

router.get('/settings', function(req, res){
    res.render('student/settings');
});


module.exports = router;