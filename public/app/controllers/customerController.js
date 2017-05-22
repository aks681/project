angular.module("customerController",[])
.controller('customerCtrl',function(Post,$timeout,User){
  var app=this;
  app.error=false;
  app.disabled= false;
  app.approved=false;
  app.pending=false;
  app.rejected=false;
  app.pending=[];
  app.approved=[];
  app.rejected=[];
  Post.getPosts().then(function(data){
    if(data.data.success){
      app.posts=data.data.posts;
    }
    else {
      app.error=data.data.message;
    }
  //  console.log(app.posts);
  });

 User.getPending().then(function(data){
    if(data.data.success){
      for(var i=0;i<data.data.pending.length;i++){
        Post.getP(data.data.pending[i]).then(function(data){
          if(data.data.success){
            app.pending.push(data.data.post);
          }
          else {
            app.error=data.data.error;
          }
        });
      }
    }else {
      app.error=data.data.error;
    }
  });

  User.getApproved().then(function(data){
     if(data.data.success){
       for(var i=0;i<data.data.approved.length;i++){
         Post.getP(data.data.approved[i]).then(function(data){
          if(data.data.success){
             app.approved.push(data.data.post);
           }
           else {
             app.error=data.data.error;
           }
         });
       }
     }else {
       app.error=data.data.error;
     }
   });

   User.getRejected().then(function(data){
      if(data.data.success){
        for(var i=0;i<data.data.rejected.length;i++){
          Post.getP(data.data.rejected[i]).then(function(data){
            if(data.data.success){
              app.rejected.push(data.data.post);
            }
            else {
              app.error=data.data.error;
            }
          });
        }
      }else {
        app.error=data.data.error;
      }
    });

 app.add=function(username,name,id){
  var object={};
  object.username=username;
  object.name=name;
  object.id=id;
  app.error=false;
  Post.addtopost(object).then(function(data){
     if(data.data.success){
       app.success=data.data.message;
       if(app.rejected.length>0){
       User.remove(object).then(function(data){
         console.log(data.data);
       });
     }
       $timeout(function(){
         app.success=false;
       },1500);
     }
     else {
       app.error=data.data.message;
       app.success=false;
       $timeout(function(){
         app.error=false;
       },1000);
     }
  });
 };
 });
