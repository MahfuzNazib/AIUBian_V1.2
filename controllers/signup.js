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
        status : req.body.status,
        department : req.body.department,
        email : req.body.mail,
        username : req.body.username,
        password : req.body.password
    }

    

    userModel.checkUsername(req.body.username, function(results){
        if(results){
            res.send('This Username is already Taken.Try another username.');
        }
        else{
            userModel.insert(user, function(status){
                if(status){
                    res.send('Successfully Registered');
                }
                else{
                    res.send('Registration is not Completed. Try again Later!!');
                }
            });
        }
    });
});

module.exports = router;