var express = require('express');
var router = express.Router();
var userModel   = require.main.require('./models/user-model');
var adminModel   = require.main.require('./models/admin-model');

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
// router.post('/allPosts', function(req, res){
    
//     res.send('Post Method Called');
// });

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


module.exports = router;