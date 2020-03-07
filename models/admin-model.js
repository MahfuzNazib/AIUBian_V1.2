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
	}
}