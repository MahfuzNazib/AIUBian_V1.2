var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
    res.render('signup/index');
});

router.post('/', function(req, res){
    var user = {
        name : req.body.fullName,
        aiubId : req.body.aiubId,
        type : req.body.type,
        department : req.body.department,
        email : req.body.mail,
        username : req.body.username,
        password : req.body.password,
        blocked : 'false'
        
    }

    userModel.checkEmail(req.body.mail, function(results){
        if(results){
            res.send('This email have already an account. Try another email');
        }
        else
        {
            userModel.checkUsername(req.body.username, function(results){
                if(results){
                    res.send('This Username is already Taken.Try another username.');
                }
                else{
                    userModel.insertLogin(user, function(status){
                        if(status){
                            //res.send('Successfully Registered');
                            userModel.insertUserInfo(user, function(status){
                                if(status){
                                    res.send('Successfully Registered');
                                }
                                else{
                                    res.send('Problem on Userinfo Table')
                                }
                            });
                        }
                        else{
                            res.send('Registration is not Completed. Try again Later!!');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;