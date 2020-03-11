var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
const { check, validationResult } = require('express-validator/check');




router.get('/', function(req, res){
    res.render('login/index',{error: []});
});

router.post('/',[
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  ], function(req, res){

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        res.render('login/index', {error:errors.mapped()}); 
    }
    else{
        var user = {
            username : req.body.username,
            password : req.body.password
        };

        userModel.validate(user, function(status){ 
            console.log(user);
            //Student
            if(status.blocked == "false"){

                if(status.type == "Student"){
                    res.cookie('username', req.body.username);
                    res.redirect('/studentHome');
                }
                
                //Alumni
                else if(status.type == "Alumni"){
                    
                    res.cookie('username', req.body.username);
                    res.redirect('/almuniHome');
                }

                //Faculty
                else if(status.type == "Faculty"){
                    
                    res.cookie('username', req.body.username);
                    res.redirect('/facultyHome');
                }

                //Admin
                else if(status.type == "Admin"){
                    res.cookie('username', req.body.username);
                    res.redirect('/adminhome');
                }

                else{
                    res.send('Invalid Username or Password');
                }
            }
            else if(status.blocked == "true"){
                res.send('Your Account is Blocked');
            }
        });
    }

    
});

module.exports = router;