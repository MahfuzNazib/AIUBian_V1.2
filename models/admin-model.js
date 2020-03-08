var db = require('./db');

module.exports = {
    getTotalPost : function(callback){
		var sql = "SELECT COUNT(postId) as totalPost from post";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(0);
			}
		});
	},

	getTotalMember : function(callback){
		var sql = "SELECT COUNT(UserId) as totalMember from userinfo";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(0);
			}
		});
	},

	getAllPost : function(callback){
		var sql = "SELECT * FROM post ORDER BY postId DESC";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getStudentPost : function(callback){
		var sql = "SELECT * FROM post WHERE type1 = 'Student' ORDER BY postId DESC";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAlumniPost : function(callback){
		var sql = "SELECT * FROM post WHERE type1 = 'Alumni' ORDER BY postId DESC";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getFacultyPost : function(callback){
		var sql = "SELECT * FROM post WHERE type1 = 'Faculty' ORDER BY postId DESC";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	deletePost : function(postId, callback){
		var sql = "DELETE FROM post WHERE postId = ?";
		db.execute(sql, [postId], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	getAllMember : function(callback){
		var sql = "SELECT UserId, profilePicture, name, aiub_id, phone, email, type FROM userinfo";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllStudentList : function(callback){
		var sql = "SELECT  UserId, profilePicture, name, aiub_id, phone, email FROM userinfo where type = 'Student'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllFacultyList : function(callback){
		var sql = "SELECT  UserId, profilePicture, name, aiub_id, phone, email FROM userinfo where type = 'Faculty'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	getAllAlumniList : function(callback){
		var sql = "SELECT  UserId, profilePicture, name, aiub_id, phone, email FROM userinfo where type = 'Alumni'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	//Add New Admin

	addAdmin : function(adminInfo, callback){
		var sql = "INSERT INTO admin VALUES(?,?,?,?,?,?,?)";
		db.execute(sql,[null, adminInfo.name, adminInfo.email, adminInfo.phone,null, adminInfo.username, adminInfo.profilePicture], function(status){
			console.log(status);
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	adminLogin : function(adminInfo, callback){
		//console.log(adminInfo);
		var sql = "INSERT INTO login VALUES(?,?,?,?,?,?,?,?)";
		db.execute(sql,[null, adminInfo.name, adminInfo.aiub_id, adminInfo.username, adminInfo.password, adminInfo.email, adminInfo.department, adminInfo.type], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},


	deleteMember : function(UserId, callback){
		var sql = "DELETE FROM userinfo WHERE UserId = ?";
		db.execute(sql, [UserId], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	updateProfilePicture : function(user, callback){
		var sql = "UPDATE admin SET profilePicture = ? WHERE username = ? ";
		console.log(user);
		db.execute(sql, [user.profilePicture, user.username], function(status){
			console.log(status);
			if(status){
				
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	getMyData : function(username, callback){
		var sql = "SELECT * FROM admin WHERE username = ?";
		db.getResults(sql,[username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}
			else{
				callback([]);
			}
		});
	}
}