var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var multer = require('multer'); //File upload
var fs = require('fs');
var date = require('date-and-time');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+'-'+file.originalname);
	}
});

var upload = multer({ storage });


// var storage = multer.diskStorage({
// 	destination: function(req, file, callback){
// 		var dir = "./uploads";

// 		if(!fs.existsSync(dir)){
// 			fs.mkdirSync(dir);
// 		}

// 		callback(null, dir);
		
// 	},

// 	filename: function(req, file, callback){
        
//         callback(null, file.originalname);
//         console.log(file.originalname);
//         //document.getElementById('imgName').innerHTML = file.originalname;
// 	}
// });

// var upload = multer({storage: storage}).array("image", 12);


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


// router.post("/timeLine", function(req, res, next){
// 	upload(req, res, function(err){
// 		if(err){
// 			return res.send("Something gone wrong");
// 		}
// 		res.send("Upload complete");
// 	})
// });

// router.post('/timeLine', function(req, res, next){
//     upload(req, res, function(err){
//         if(err){
//             res.send('Something wrong');
//         }
//         else{
//             var datetime = new Date();
//             // var image = req.body.image;
//             var image = req.body.image;
//             var createPost = {
//                 postDate : datetime.toISOString().slice(0,10),
//                 text : req.body.text,
//                 images : image,
//                 video : 'null',
//                 username : 'tanvir',
//                 type : 'Student',
//                 email : 'tanvir@gmail.com',
//                 postLike : 0
//             };

//             userModel.insertPost(createPost, function(status){
//                 if(status){
//                     res.redirect('/studentHome/timeLine');
//                 }
//                 else{
//                     res.send('Posting Failed');
//                 }
//             });
//         }
//     });
// });


router.post('/timeLine', upload.single('image'), function(req, res, next){
    
            var datetime = new Date();
            // var image = req.body.image;
            var image = req.file.filename;
            var createPost = {
                postDate : datetime.toISOString().slice(0,10),
                text : req.body.text,
                images : image,
                video : 'null',
                username : 'tanvir',
                type : 'Student',
                email : 'tanvir@gmail.com',
                postLike : 0
            };

            userModel.insertPost(createPost, function(status){
                if(status){
                    res.redirect('/studentHome/timeLine');
                }
                else{
                    res.send('Posting Failed');
                }
            });
    });
//});



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