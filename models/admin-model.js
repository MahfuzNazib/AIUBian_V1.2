var db = require('./db');

module.exports = {
    getTotalPost : function(callback){
		var sql = "SELECT COUNT(postId) as totalPost from post";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	}
}