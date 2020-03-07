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
	}
}