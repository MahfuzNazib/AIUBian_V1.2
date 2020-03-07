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
    userModel.getAllData(function(result){
        userModel.getByUname(req.cookies['username'], function(userInfo){
            userModel.notificationInfo(req.cookies['username'] , function(notifiInfo){
                console.log(notifiInfo);
                res.render('student/index', {data : result, userInfo : userInfo, notifiInfo: notifiInfo});
            });
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
    userModel.getByUname(req.cookies['username'], function(userInfo){
        userModel.getMyPost(req.cookies['username'], function(results){
            res.render('student/timeLine', {postList : results, userInfo : userInfo});
        });
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


//Like and Notofication
router.post("/likeExe", function(req, res){
    console.log(req.body.id);
    var user = {
        like : req.body.like,
        postId : req.body.postId

    };
    console.log(user);

    userModel.updateLike(user, function(status){ 
        if(status){
            
            var notifiInfo = {
                sender : req.cookies.username,
                receiver: req.body.username
            }
            var data = "notifiInfo "+req.cookies.username+" "+req.body.username;
            console.log(data);

            userModel.notification(notifiInfo, function(staus2){
                console.log("Notification Send!");
                res.send(true);
            });
            

            //console.log(new Date());

            
        }
    });
});

router.post('/notifiClear', function(req, res){
    console.log("On student.js ");
    var info = {
        username: req.body.uname
    }
    userModel.updateNotifi(info, function(status){
        res.send(true);
    });

});



//View Profie

router.get('/viewProfile/:UserId', function(req, res){
    userModel.viewUser(req.params.UserId, function(userInfo){
        console.log(userInfo.type);
        if(userInfo.type == "Student"){
            userModel.showUserPosts(req.params.UserId, function(postList){
                //console.log(postList);
                res.render('viewProfile/profileOfStudent', {data : userInfo, postList : postList});
            });
        }
        else if(userInfo.type == "Faculty"){
            res.send('Faculty Profile Requested');
            //res.render('viewProfile/profileOfFaculty', {data : results});
        }
        else{
            //res.render('viewProfile/profileOfAlumni', {data : results});
        }
        //res.render('viewProfile/profileOfStudent', {data : results});
    });
});

module.exports = router;