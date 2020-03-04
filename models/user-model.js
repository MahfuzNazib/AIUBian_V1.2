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
		var sql = "SELECT * FROM userinfo, login WHERE login.username = ?";
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


	update : function(user, callback){
		var sql = "update user set username=?, password=?, type=? where id=?";
		db.execute(sql, [user.username, user.password, user.type, user.id], function(status){
			if(status){
				callback(true);
			}else{
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
	}
}