//Declaration

var express     = require('express');
var app         = express();
var ejs         = require('ejs');
var multer      = require('multer');
var fs          = require('fs');
var date        = require('date-and-time');
var bodyParser  = require('body-parser');
var cookieParser= require('cookie-parser');
var login       = require('./controllers/login');
var signup      = require('./controllers/signup');
var adminHome   = require('./controllers/adminhome');
var addAdmin    = require('./controllers/addAdmin');
var student     = require('./controllers/student');
//var logout = require('./controllers/logout');


//Configuration

app.set('view engine', 'ejs');

//MiddleWare
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/login',login);
app.use('/signup', signup);
app.use('/adminhome', adminHome);
app.use('/addAdmin',addAdmin);
app.use('/studentHome', student);


//Routers
// var storage = multer.diskStorage({
// 	destination: function(req, file, callback){
// 		var dir = "./uploads";

// 		if(!fs.existsSync(dir)){
// 			fs.mkdirSync(dir);
// 		}

// 		callback(null, dir);
		
// 	},

// 	filename: function(req, file, callback){
// 		callback(null, file.originalname);
// 	}
// });

// var upload = multer({storage: storage}).array("files", 12);

// app.post("/upload", function(req, res, next){
// 	upload(req, res, function(err){
// 		if(err){
// 			return res.send("Something gone wrong");
// 		}
// 		res.send("Upload complete");
// 	})
// });



app.get('/', function(request, response){
    response.send('Welcome to AIUBian Application');
});


//Server Startup

app.listen(3000, function(){
    console.log('AIUBian Server Started at Port No 3000!!!!');
});