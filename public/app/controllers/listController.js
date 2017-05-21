angular.module("listController",[])
.controller('listCtrl',function($routeParams,Post,User,$timeout){
  var app=this;
  app.error=false;
 function getPosts(){
  Post.getP($routeParams.id).then(function(data){
    if(data.data.success){
      app.users=data.data.post.pending;
      app.id=data.data.post._id;
      app.limit=data.data.post.limit;
      app.name=data.data.post.postname;
    }
    else {
      app.error=data.data.message;
      $timeout(function(){
        app.error=false;
      },1200);
    }
  });
};

getPosts();

app.rejectuser=function(username){
  var object={};
  object.id=app.id;
  object.username=username;
  User.rejectUser(object).then(function(data){
    if(data.data.success){
    }
    else {
    }
  });
  Post.reject(object).then(function(data){
   if(data.data.success){
     app.error=data.data.message;
     getPosts();
   }
   else {
     app.error=data.data.message;
     $timeout(function(){
       app.error=false;
     },1200);
   }
  });
};

app.approveuser=function(username,name){
  var object={};
  if(app.limit>0){
  object.id=app.id;
  object.username=username;
  object.name=name;
  User.approveUser(object).then(function(data){
    if(data.data.success){
      app.success=data.data.message;
    }
    else {
      app.error=data.data.message;
      $timeout(function(){
        app.error=false;
      },1200);
    }
  });
  Post.reject(object).then(function(data){

  });
  Post.approve(object).then(function(data){
   if(data.data.success){
     app.error=data.data.message;
     getPosts();
   }
   else {
     app.error=data.data.message;
     $timeout(function(){
       app.error=false;
     },1200);
   }
  });
}
else {
  app.error="Limit reached";
}
};
});
