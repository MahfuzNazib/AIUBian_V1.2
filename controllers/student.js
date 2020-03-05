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

//Edit Page Request
router.get('/editProfile', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
        res.render('student/editProfile',{user : result});
    });
});

//Post Method for Update Profile Data in editProfile Page

router.post('/editProfile', function(req, res){
    var data = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        facebook : req.body.facebook,
        linkedin : req.body.linkedin,
        aiub_id : req.body.aiub_id,
        department : req.body.department,
        program : req.body.program,
        semester : req.body.semester,
        thesisName : req.body.thesisName,
        skills : req.body.skills,
        github : req.body.github,
        hackerrank : req.body.hackerrank,
        portfolio : req.body.portfolio
    }

    console.log(data);
    userModel.updateStudent(data, function(status){
        if(status){
            //res.send('Profile Successfully Updated');
            res.redirect('/studentHome/studentProfile');
        }
        else{
            res.send('Profile Updation Faield !!');
        }
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