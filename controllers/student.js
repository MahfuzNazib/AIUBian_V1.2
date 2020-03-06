var express     = require('express');
var router      = express.Router();
var userModel   = require.main.require('./models/user-model');
var multer      = require('multer'); 
var fs          = require('fs');
var date        = require('date-and-time');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+'-'+file.originalname);
	}
});

var upload = multer({ storage });

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
    // userModel.getByUname(req.cookies['username'], function(userInfo){ 
    //     userModel.getAllPost(req.cookies['username'], function(postInfo){ 
    //         res.render('student/index', {postList : postInfo, userInfo : userInfo});
    //     });
    // });

    userModel.getAllData(function(result){
        userModel.getByUname(req.cookies['username'], function(userInfo){
            res.render('student/index', {data : result, userInfo : userInfo});
        });
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
        name        : req.body.name,
        email       : req.body.email,
        phone       : req.body.phone,
        facebook    : req.body.facebook,
        linkedin    : req.body.linkedin,
        aiub_id     : req.body.aiub_id,
        department  : req.body.department,
        program     : req.body.program,
        semester    : req.body.semester,
        thesisName  : req.body.thesisName,
        skills      : req.body.skills,
        github      : req.body.github,
        hackerrank  : req.body.hackerrank,
        portfolio   : req.body.portfolio
    }

    userModel.updateStudent(data, function(status){
        if(status){
            res.redirect('/studentHome/studentProfile');
        }
        else{
            res.send('Profile Updation Faield !!');
        }
    });

});

router.get('/timeLine', function(req, res){
    // userModel.getByUname(req.cookies['username'], function(result){
    //     res.render('student/timeLine',{user : result});
    // });
    userModel.getMyPost(req.cookies['username'], function(results){
        res.render('student/timeLine', {postList : results});
        // console.log(results.postId);
        // console.log(results.username);
    });
});

//Edit Profile Picture

router.post('/profilePicture', upload.single('image'), function(req, res, next){
    var user = {
        profilePicture : req.file.filename,
        username : req.cookies['username']
    }
    userModel.updateProfilePicture(user, function(status){
        if(status){

            res.redirect('/studentHome/editProfile');
        }
        else{
            res.send('Profile picture uploded Failed');
        }
    });

});


router.post('/timeLine', upload.single('image'), function(req, res, next){

        var datetime    = new Date();
        var image       = req.file.filename;
        var createPost  = {
            postDate    : datetime.toISOString().slice(0,10),
            text        : req.body.text,
            images      : image,
            video       : 'null',
            username    : req.cookies['username'],
            postLike    : 0
        };
        console.log(createPost.username);
        userModel.insertPost(createPost, function(status){
            if(status){
                res.redirect('/studentHome/timeLine');
            }
            else{
                res.send('Posting Failed');
            }
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