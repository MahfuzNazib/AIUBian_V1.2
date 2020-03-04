var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){ 
        res.render('student/index', {user : result});
    });
});

router.get('/studentProfile', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
        res.render('student/studentProfile',{user : result});
    });
    
});


router.get('/editProfile', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
        res.render('student/editProfile',{user : result});
    });
});

router.get('/timeLine', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
        res.render('student/timeLine',{user : result});
    });
});

router.get('/chat', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
        res.render('student/chat',{user : result});
    });
});

router.get('/settings', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
        res.render('student/settings',{user : result});
    });

});


module.exports = router;