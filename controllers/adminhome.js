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
            adminModel.getMyData(req.cookies['username'], function(myData){
                console.log(myData);
                adminModel.getTotalAdmin(function(totalAdmin){
                    console.log(totalAdmin);
                    adminModel.totalStudentPost(function(sPost){
                        adminModel.totalFacultyPost(function(fPost){
                            adminModel.totalAlumniPost(function(aPost){
                                res.render('adminhome/index', {data : results, totalMember : totalMember, myData : myData, totalAdmin : totalAdmin, sPost : sPost, fPost : fPost, aPost : aPost});
                            });
                        }); 
                    });
                });
            });
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


//Searching of All MemberList Page via Post Request

router.post('/allMemberList', function(req, res){
    var src = req.body.search;
    adminModel.searchMember(src, function(result){

        console.log(src);
        res.render('adminhome/searchMember', {userList : result});
        // res.redirect('/adminhome/allMemberList', {userList : result});
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
    // res.render('adminHome/adminTimeLine');
     adminModel.getMyData(req.cookies['username'], function(userInfo){
        userModel.getMyPost(req.cookies['username'], function(results){
            res.render('adminHome/adminTimeLine', {postList : results, userInfo : userInfo});
        });
     });
});


router.post('/adminTimeLine', upload.single('image'), function(req, res, next){
    
    adminModel.getMyData(req.cookies['username'], function(result){
        var datetime    = new Date();
        var image       = req.file.filename;
        var createPost  = {
            postDate    : datetime.toISOString().slice(0,10),
            text        : req.body.text,
            images      : image,
            video       : 'null',
            username    : req.cookies['username'],
            postLike    : 0,
            name        : result.name,
            type        : 'Admin'
        };
        console.log(createPost.username);
        userModel.insertPost(createPost, function(status){
            if(status){
                res.redirect('/adminhome/adminTimeLine');
            }
            else{
                res.send('Posting Failed');
            }
        });
    });
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
            userModel.showUserPosts(req.params.UserId, function(postList){
                res.render('viewProfile/profileOfFaculty', {data : userInfo, postList : postList});
            });
        }
        else if(userInfo.type == "Alumni"){
            userModel.showUserPosts(req.params.UserId, function(postList){
                res.render('viewProfile/profileOfAlumni', {data : userInfo, postList : postList});
            });
        }
    });
});


//Blocked User Profile

router.get('/blockProfile/:email', function(req, res){
    adminModel.blockUser(req.params.email, function(status){
        if(status){
            // res.send('This User Account is Blocked. Check BlockList !!');
            res.redirect('/adminhome/blockList');
        }
        else{
            res.send('Not Blocking');
        }
    });
});

//Get BlockList

router.get('/blockList', function(req, res){
    adminModel.blockList(function(results){
        res.render('adminhome/blockList', {userList : results});
    });
});


router.get('/unBlock/:email', function(req, res){
    adminModel.unBlockUser(req.params.email, function(status){
        if(status){
            // res.send('Profile Successfully Unblocked.');
            res.redirect('/adminhome/blockList');
        }
        else{
            res.send('Still Blocked');
        }
    });
});



module.exports = router;