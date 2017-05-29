angular.module("listController",[])
.controller('listCtrl',function($routeParams,Post,User,$timeout,$scope,$sce){
  var app=this;
  app.error=false;
  app.username=$routeParams.username;
  app.postname=$routeParams.name;
  app.identify=$routeParams.identify;
  if($routeParams.name){
    var object={};
    object.username=app.username;
    object.id=app.identify;
    User.download(object).then(function(resp){
      var file = new Blob([resp.data], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
    });
  }
  if($routeParams.id){
 function getPosts(){
  Post.getP($routeParams.id).then(function(data){
    if(data.data.success){
      app.users=data.data.post.pending;
      app.appuser=data.data.post.approved;
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
   }
   $timeout(function(){
     app.error=false;
   },1200);
  });
  User.fileremove(object).then(function(data){
  });
};

app.approveuser=function(username,name){
  var object={};
  if(app.limit>0){
  object.id=app.id;
  object.username=username;
  object.name=name;
  User.approveUser(object).then(function(data){
  });
  Post.approve(object).then(function(data){
   if(data.data.success){
     app.success=data.data.message;
     Post.reject(object).then(function(data){
     });
     $timeout(function(){
       getPosts();
       app.success=false;
     },700);
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
}
});
