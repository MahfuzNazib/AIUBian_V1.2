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
		var sql = "SELECT * from userinfo where email = (SELECT email from login where username = ?)";
		db.getResults(sql, [username], function(results){
			//console.log(results);
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
		var sql = "INSERT INTO userinfo VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.name, user.email, user.aiubId, null, null, null, user.department, null, null, null, null, null, null, null, null, null, null, null, null, null, null, user.username, user.type, null],  function(status){
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

	updateProfilePicture : function(user, callback){
		var sql = "UPDATE userinfo SET profilePicture = ? WHERE username = ? ";
		db.execute(sql, [user.profilePicture, user.username], function(status){
			if(status){
				callback(true);
			}
			else{
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
		var sql = "INSERT INTO post VALUES(?,?,?,?,?,?,?)";
		db.execute(sql, [null, createPost.postDate,createPost.text, createPost.images, createPost.video, createPost.postLike, createPost.username], function(status){
			if(status){
				
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	getMyPost : function(username, callback){
		var sql =  "SELECT * FROM post WHERE username = ? ORDER BY postId DESC";
		db.getResults(sql, [username], function(results){
			//console.log(results);
			if(results.length > 0){
				callback(results);
			}
			else{
				callback([]);
			}
		});
	},

	getAllPost : function(username, callback){
		var sql =  "SELECT * from post where username != ? ORDER BY postId DESC";
		db.getResults(sql, [username], function(results){
			//console.log(results);
			if(results.length > 0){
				callback(results);
			}
			else{
				callback([]);
			}
		});
	},

	getAllData : function(callback){
		var sql =  "SELECT * FROM userinfo INNER JOIN post ON userinfo.username = post.username ORDER BY post.postId DESC";
		db.getResults(sql, null, function(results){
			//console.log(results);
			if(results.length > 0){
				callback(results);
			}
			else{
				callback([]);
			}
		});
	},

	//like implementation
	updateLike : function(user, callback){
		var sql = "update post set postLike=? where postId=?";
		db.execute(sql, [user.like, user.postId], function(status){
			console.log("Update like on post table");
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	notification: function(info, callback){
		var data = info.sender + " " + info.receiver + "sdkfhksd";
		console.log(data);
		var sql = "insert into notification values(?,?,?,?,?)";
		db.execute(sql, [null, info.sender, "like", info.receiver, "false"], function(status){
			console.log("Insert on notification table");
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	notificationInfo: function(username, callback){
		var sql = "select * from notification where receiver = ? and seen=?";
		db.getResults(sql, [username, "false"], function(results){
			if(results.length > 0){
				callback(results);
			}
			else{
				callback(null);
			}
		});
	},

	updateNotifi: function(info, callback){
		console.log("N update called");
		var sql = "UPDATE notification SET seen=? WHERE seen=? and receiver = ?";
		db.execute(sql, ["true", "false", info.username], function(status){
			if(status){
				console.log("notifi update");
				callback(true);
			}else{
				console.log("notifi update fail");
				callback(false);
			}
		});
	}
}