function like(postId, i){

  var usernameTemp = "#username"+i; 
  var username = $(usernameTemp).html();
  var likeData = "#likeCount"+i;
  var temp = $(likeData).html();
  var totalLike = parseInt(temp) + 1;
  //document.getElementById('demo').innerHTML = totalLike;
  $.ajax({
        type: 'POST',
        data: {postId: postId, like: totalLike, username: username},
        url: '/studentHome/likeExe',
        success: function(status) {
          if(status){
            console.log("like inserted");
            $(likeData).html(totalLike);
          }
          
        },
        error: function(error){
          alert(error.status);
        }
  });


}




function showNotifi(){ 
 var username = $("#username").html();
 $("#demo").html(username);
 //document.getElementById('demo').innerHTML = username;
 
  $.ajax({
        type: 'POST',
        data: {uname: username},
        url: '/studentHome/notifiClear',
        success: function(status) {
          if(status){
            console.log("Notification Cleared!");
            $("#notifiNum").html("");
          }
          
        },
        error: function(error){
          alert(error.status);
        }
  });
}


function passwordChange(){
  var oPass =  $("#OldPassword").val();
  var nPass =  $("#nPassword").val();
  var cnPass =  $("#cnPassword").val();
  var username =  $("#hiddenUsername").html();

  $("#test").html(username);
  

  $.ajax({
        type: 'POST',
        data: {username: username, nPass: nPass},
        url: '/facultyHome/passwordChange',
        success: function(status) {
          if(status){
            console.log("password changed!");
          }
          
        },
        error: function(error){
          alert(error.status);
        }
  });

  
}

function deletePost(postId){
  //$("#test").html(postId);

   $.ajax({
        type: 'POST',
        data: {postId: 37},
        url: '/facultyHome/deletePost',
        success: function(status) {
          if(status){
            console.log("post Deleted!!!");
            window.location = 'http://localhost:3000/facultyHome/timeline'
          }
          
        },
        error: function(error){
          alert(error.status);
        }
  });

}

function n1(){
  $("#test").html("Hello Tanvir");
}




function deletePostForStudent(postId){
  //$("#test").html(postId);

   $.ajax({
        type: 'POST',
        data: {postId: postId},
        url: '/studentHome/deletePost',
        success: function(status) {
          if(status){
            console.log("post Deleted!!!");
            window.location = 'http://localhost:3000/studentHome/timeline'
          }
          
        },
        error: function(error){
          alert(error.status);
        }
  });

}

function searchProfile(){
  var email = $("#searchEmail").val();

  //$("#test3").html(email);

   $.ajax({
        type: 'POST',
        data: {email: email},
        url: '/facultyHome/searchProfile',
        success: function(status) {
          if(status){
            console.log("search profile ready!!!");
           // window.location = 'http://localhost:3000/facultyHome/showSearchResult'
          }
          
        },
        error: function(error){
          alert(error.status);
        }
  });

}