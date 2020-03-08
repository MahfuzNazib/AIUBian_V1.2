var express = require('express');
var router = express.Router();
var userModel   = require.main.require('./models/user-model');
var adminModel   = require.main.require('./models/admin-model');
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

router.get('/', function(req, res){
    adminModel.getTotalPost(function(results){
        console.log(results);
        adminModel.getTotalMember(function(totalMember){
            console.log(totalMember);
            res.render('adminhome/index', {data : results, totalMember : totalMember});
        });
    });
});

//Get Request for All POst
router.get('/allPosts', function(req, res){
    adminModel.getAllPost(function(results){
        res.render('adminhome/posts', {postList : results});
    });
    
});


router.get('/allPosts/:postId', function(req, res){
    adminModel.deletePost(req.params.postId, function(status){
        if(status){
            res.redirect('/adminhome/allPosts');
        }
        else{
            res.send('This post is not Deleted Yet. Try Again!!');
        }
    });
    // res.send(req.params.postId);
});


//Chat Page Request
router.get('/chat', function(req, res){
    res.render('adminhome/chat');
});

//Profile Page Request
router.get('/profile', function(req, res){
    adminModel.getMyData(req.cookies['username'], function(results){
        res.render('adminhome/profile',{data : results});
    });
    
});

//Edit Profile Page Request
router.get('/editProfile', function(req, res){
    adminModel.getMyData(req.cookies['username'], function(results){
        res.render('adminhome/editProfile',{data : results});
    });
});

router.post('/editProfile', function(req, res){
    var user = {
        name : req.body.name,
        phone : req.body.phone,
        address : req.body.address,
        username : req.cookies['username']
    };
    console.log(user);
    adminModel.updateMyData(user, function(status){
        if(status){
            res.redirect('/adminhome/editProfile');
        }
        else{
            res.send('Updation Failed !!');
        }
    });
});


//Edit Profile Picture
router.post('/profilePicture', upload.single('image'), function(req, res, next){
    var user = {
        profilePicture : req.file.filename,
        username : req.cookies['username']
    }
    
    adminModel.updateProfilePicture(user, function(status){
        if(status){
            // console.log(user);
            res.redirect('/adminhome/editProfile');
        }
        else{
            res.send('Profile picture uploded Failed');
        }
    });

});



//Faculty Post Request
router.get('/facultyPost', function(req, res){
    adminModel.getFacultyPost(function(results){
        res.render('adminhome/facultyPost',{postList : results});
    });
});

//Alumni Post List Request

router.get('/alumniPost', function(req, res){
    adminModel.getAlumniPost(function(results){
        res.render('adminhome/alumniPOst', {postList : results});
    });
});

//Student post List Request
router.get('/studentPost', function(req, res){
    adminModel.getStudentPost(function(results){
        res.render('adminhome/studentPost',{postList : results});
    });
    
});

//All Member List Request
router.get('/allMemberList', function(req, res){
    adminModel.getAllMember( function (results){
        res.render('adminhome/allMemberList', {userList : results});
    });
});


//Delete Member from All member Lists
router.get('/allMemberList/:UserId', function(req, res){
    adminModel.deleteMember(req.params.UserId, function(status){
        if(status){
            res.redirect('/adminhome/allMemberList');
        }
        else{
            res.send('Not Deleted !!');
        }
    });
});



//Faculty Member List Request
router.get('/facultyMemberList', function(req, res){
    adminModel.getAllFacultyList(function(results){
        res.render('adminhome/facultyMemberList' ,{userList : results});
    });
});

//Alumni Member List Request
router.get('/alumniMemberList', function(req, res){
    adminModel.getAllAlumniList(function(results){
        res.render('adminhome/alumniMemberList', {userList : results});
    });
});

//Student Member List Request
router.get('/studentMemberList', function(req, res){
    adminModel.getAllStudentList(function(results){
        res.render('adminhome/studentMemberList' ,{userList : results});
    });
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


router.post('/newAdmin', function(req, res){
    // res.render('adminHome/newAdmin');
    var adminInfo = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        username : req.body.userName,
        password : req.body.Password,
        aiub_id : '000',
        department : '000',
        type : 'Admin',
        profilePicture : null
    };

    adminModel.addAdmin(adminInfo, function(status){
        console.log(adminInfo);
        if(status){
            adminModel.adminLogin(adminInfo, function(result){
                //console.log(result);
                if(result){
                    res.send('New Admin Registered');
                }
                else{
                    res.send('Problem Occure on Login Table !!');
                }
            });
        }  
        else{
            res.send('Not Registered');
        }
    });

});


//View Users
router.get('/viewProfile/:UserId', function(req, res){
    userModel.viewUser(req.params.UserId, function(userInfo){
        console.log(userInfo.type);
        if(userInfo.type == "Student"){
            userModel.showUserPosts(req.params.UserId, function(postList){
                res.render('viewProfile/profileOfStudent', {data : userInfo, postList : postList});
            });
        }
        else if(userInfo.type == "Faculty"){
            res.send('Faculty Profile Requested');
            //res.render('viewProfile/profileOfFaculty', {data : results});
        }
        else{
            res.send('Alumni Page Requested');
            //res.render('viewProfile/profileOfAlumni', {data : results});
        }
    });
});





module.exports = router;