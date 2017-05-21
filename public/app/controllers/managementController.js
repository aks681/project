angular.module("managementController",[])
.controller('managementCtrl',function(User,Post,$timeout,$location){
  var app =this;
  app.loading=true;
  app.accessdenied = true;
  app.errorMsg=false;
  app.error=false;
  app.limit=undefined;

  app.addPost=function(post){
    app.loading=true;
    app.errorMsg=false;
    Post.create(app.post).then(function(data){
      if(data.data.success)
      {
        app.loading=false;
        app.successMsg=data.data.message + '...Redirecting to mainpage';
        $timeout(function(){
        $location.path('/profile');
        },2000);

      }
      else {
        app.loading=false;
        app.errorMsg=data.data.message;
      }
    });
  };

 function getPosts(){
  Post.getPosts().then(function(data){
    if(data.data.success){
        app.posts= data.data.posts;
        app.loading = false;
        app.accessdenied = false;
    }
    else {
      app.errorMsg = data.data.message;
      app.loading= false;
    }
  });
};

getPosts();

/*  app.showMore = function(number){
    app.error=false;
    if(number>0)
    {
      app.limit=number;
    }
    else {
      app.error="Enter a valid number";
    }
  };

  app.showAll=function(){
     app.limit=undefined;
     app.error=false;
  };*/

  app.deletePost = function(id){
    Post.deletePost(id).then(function(data){
      if(data.data.success){
         app.error=data.data.message;
         $timeout(function(){
           app.error=false;
         },1200);
         getPosts();
      }else {
        app.error=data.data.message;
        $timeout(function(){
          app.error=false;
        },1200);
      }
    });
  };

})

.controller('editCtrl',function($scope,$routeParams,User,$timeout,Post){
      var app=this;
      $scope.nameTab='active';
      app.phase1=true;
      app.phase2=false;
      app.phase3=false;
      app.disabled=false;
        Post.getPost($routeParams.id).then(function(data){
          if(data.data.success){
            $scope.newName=data.data.post.postname;
            $scope.newLimit=data.data.post.limit;
            $scope.newQualification=data.data.post.qualification;
            $scope.newExperience=data.data.post.experience;
            $scope.newDescription=data.data.post.description;
            app.currentpost=data.data.post._id;
          }else {
            app.error=data.data.message;
          }
        });

    app.namePhase = function(){
     app.phase1=true;
     app.phase2=false;
     app.phase3=false;
     app.phase4=false;
     app.phase5=false;
     $scope.nameTab='active';
     $scope.limitTab='default';
     $scope.qualificationTab='default';
     $scope.experienceTab='default';
     $scope.descriptionTab='default';
   };

   app.limitPhase=function(){
     app.phase1=false;
     app.phase2=true;
     app.phase3=false;
     app.phase4=false;
     app.phase5=false;
     $scope.nameTab='default';
     $scope.limitTab='active';
     $scope.qualificationTab='default';
     $scope.experienceTab='default';
     $scope.descriptionTab='default';
   };
   app.qualificationPhase=function(){
     app.phase1=false;
     app.phase2=false;
     app.phase3=true;
     app.phase4=false;
     app.phase5=false;
     $scope.nameTab='default';
     $scope.limitTab='default';
     $scope.qualificationTab='active';
     $scope.experienceTab='default';
     $scope.descriptionTab='default';
   };
   app.experiencePhase=function(){
     app.phase1=false;
     app.phase2=false;
     app.phase3=false;
     app.phase4=true;
     app.phase5=false;
     $scope.nameTab='default';
     $scope.limitTab='default';
     $scope.qualificationTab='default';
     $scope.experienceTab='active';
     $scope.descriptionTab='default';
   };
   app.descriptionPhase=function(){
     app.phase1=false;
     app.phase2=false;
     app.phase3=false;
     app.phase4=false;
     app.phase5=true;
     $scope.nameTab='default';
     $scope.limitTab='default';
     $scope.qualificationTab='default';
     $scope.experienceTab='default';
     $scope.descriptionTab='active';
   };


   app.updateName=function(newName){

     app.disabled=true;
     var object={};
     object._id=app.currentpost;
     object.name=$scope.newName;
     Post.editPost(object).then(function(data){
           if(data.data.success){
             app.namesuccess=data.data.message;
             $timeout(function(){
               app.nameerror=false;
               app.namesuccess=false;
               app.disabled=false;
             },1250);
           }
           else {
             app.nameerror=data.data.message;
             app.disabled=false;
           }
     });
   };

   app.updateLimit=function(newLimit){

     app.disabled=true;
     var object={};
     object._id=app.currentpost;
     object.limit=$scope.newLimit;
     Post.editPost(object).then(function(data){
           if(data.data.success){
             app.limitsuccess=data.data.message;
             $timeout(function(){
               app.limiterror=false;
               app.limitsuccess=false;
               app.disabled=false;
             },1250);
           }
           else {
             app.limiterror=data.data.message;
             app.disabled=false;
           }
     });
   };

   app.updateQualification=function(newQualification){

     app.disabled=true;
     var object={};
     object._id=app.currentpost;
     object.qualification=$scope.newQualification;
     Post.editPost(object).then(function(data){
           if(data.data.success){
             app.qualificationsuccess=data.data.message;
             $timeout(function(){
               app.qualificationerror=false;
               app.qualificationsuccess=false;
               app.disabled=false;
             },1250);
           }
           else {
             app.qualificationerror=data.data.message;
             app.disabled=false;
           }
     });
   };

   app.updateExperience=function(newExperience){

     app.disabled=true;
     var object={};
     object._id=app.currentpost;
     object.experience=$scope.newExperience;
     Post.editPost(object).then(function(data){
           if(data.data.success){
             app.experiencesuccess=data.data.message;
             $timeout(function(){
               app.experiencerror=false;
               app.experiencesuccess=false;
               app.disabled=false;
             },1250);
           }
           else {
             app.experiencerror=data.data.message;
             app.disabled=false;
           }
     });
   };

   app.updateDescription=function(newDescription){

     app.disabled=true;
     var object={};
     object._id=app.currentpost;
     object.description=$scope.newDescription;
     Post.editPost(object).then(function(data){
           if(data.data.success){
             app.descriptionsuccess=data.data.message;
             $timeout(function(){
               app.descriptionerror=false;
               app.descriptionsuccess=false;
               app.disabled=false;
             },1250);
           }
           else {
             app.descriptionerror=data.data.message;
             app.disabled=false;
           }
     });
   };


});
