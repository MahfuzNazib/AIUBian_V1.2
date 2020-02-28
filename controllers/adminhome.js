var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('adminhome/index');
});

router.get('/allPosts', function(req, res){
    res.render('adminhome/posts');
});

//Chat Page Request
router.get('/chat', function(req, res){
    res.render('adminhome/chat');
});

//Profile Page Request
router.get('/profile', function(req, res){
    res.render('adminhome/profile');
});

//Edit Profile Page Request
router.get('/editProfile', function(req, res){
    res.render('adminhome/editProfile');
});

//Faculty Post Request
router.get('/facultyPost', function(req, res){
    res.render('adminhome/facultyPost');
});

//Alumni Post List Request

router.get('/alumniPost', function(req, res){
    res.render('adminhome/alumniPOst');
});

//Student post List Request
router.get('/studentPost', function(req, res){
    res.render('adminhome/studentPost');
});

//All Member List Request
router.get('/allMemberList', function(req, res){
    res.render('adminhome/allMemberList');
});

//Faculty Member List Request
router.get('/facultyMemberList', function(req, res){
    res.render('adminhome/facultyMemberList');
});

//Alumni Member List Request
router.get('/alumniMemberList', function(req, res){
    res.render('adminhome/alumniMemberList');
});

//Student Member List Request
router.get('/studentMemberList', function(req, res){
    res.render('adminhome/studentMemberList');
});

//Admin TimeLine Request
router.get('/adminTimeLine', function(req, res){
    res.render('adminHome/adminTimeLine');
});

//Settings Page Request
router.get('/settings', function(req, res){
    res.render('adminHome/settings');
});

//New Admin Request
router.get('/newAdmin', function(req, res){
    res.render('adminHome/newAdmin');
});


module.exports = router;