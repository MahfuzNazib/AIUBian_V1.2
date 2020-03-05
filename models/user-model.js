var db = require('./db');

module.exports= {
	// getById : function(id, callback){
	// 	var sql = "select * from user where id=?";
	// 	db.getResults(sql, [id], function(results){
	// 		if(results.length > 0){
	// 			callback(results);
	// 		}else{
	// 			callback([]);
	// 		}
	// 	});
	// },

	getById : function(id, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	getByID : function(id, callback){
		var sql = "select * from user where id = ?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results);
			}
			else{
				callback(false);
			}
		});
	},

	getByName : function (username, callback){
		var sql = "select * from user where username = ?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results);
			}
			else{
				callback([]);
			}
		});
	},
	getAll : function(callback){
		var sql = "SELECT * from userinfo,login where login.email = userinfo.email ";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	

	//getData by Email

	getByEmail : function(user, callback){
		var sql = "SELECT * FROM userinfo, login WHERE login.username = ? AND (userinfo.email = login.email) ";
		db.getResults(sql, [user.username], function(results){
			if(results.length > 0){
				callback(results);
			}
			else{
				callback(null);
			}
		});
	},


	validate: function(user, callback){
		var sql ="SELECT * from login WHERE username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){
			if(results.length > 0){
				
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	//check Username is available or Not

	checkUsername : function(username, callback){
		var sql = "select name from login where username = ?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	//check Email is Available or Not
	checkEmail : function(email, callback){
		var sql = "select name from login where email = ?";
		db.getResults(sql, [email], function(results){
			if(results.length > 0){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	getByUname: function(username, callback){
		//var sql = "SELECT * FROM login WHERE username = ?";.
		//var sql = "SELECT * FROM userinfo, login WHERE login.username = ?";
		var sql = "SELECT * from userinfo where email = (SELECT email from login where username = ?)";
		db.getResults(sql, [username], function(results){
			console.log(results);
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

	//Register New Users
	insertLogin: function(user, callback){
		var sql = "insert into login values(?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.name, user.aiubId, user.username, user.password, user.email, user.department, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	//Inset Into UserInfo Table
	insertUserInfo: function(user, callback){
		var sql = "INSERT INTO userinfo VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.name, user.email, user.aiubId, null, null, null, user.department, null, null, null, null, null, null, null, null, null, null, null, null, null, null], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	updateStudent : function(data, callback){
		var sql = "UPDATE userinfo SET name=?,aiub_id=?,phone=?,facebook=?,linkedin=?,department=?,program=?,semester=?,thesisName=?,skills=?,github=?,stackoverflow=?,hackerrank=?,portfolio=? WHERE email = ?";
		db.execute(sql, [data.name, data.aiub_id, data.phone, data.facebook, data.linkedin, data.department, data.program, data.semester, data.thesisName, data.skills, data.github, data.stackoverflow,data.hackerrank,  data.portfolio,  data.email], function(status){
			if(status){
				console.log(status);
				callback(true);
			}else{
				console.log(status);
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	//Insert Post

	insertPost : function(createPost, callback){
		console.log(createPost);
		var sql = "INSERT INTO post VALUES(?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, createPost.postDate, createPost.email, createPost.type, createPost.text, createPost.images, createPost.video, createPost.postLike, createPost.username], function(status){
			if(status){
				
				callback(true);
			}
			else{
				callback(false);
			}
		});
	}
}