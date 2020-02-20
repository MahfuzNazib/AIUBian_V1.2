var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('student/index');
});

router.get('/studentProfile', function(req, res){
    res.render('student/studentProfile');
});


router.get('/editProfile', function(req, res){
    res.render('student/editProfile');
});


module.exports = router;