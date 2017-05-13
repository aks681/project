angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout,$location,$rootScope){
  var app=this;
app.loadme=false;
  $rootScope.$on('$routeChangeStart',function(){

    if(Auth.isLoggedIn()){
      app.isLoggedIn=true;
      Auth.getUser().then(function(data){
        app.username=data.data.username;
        app.email=data.data.email;
        app.loadme=true;
      });
    }
    else{
      app.isLoggedIn=false;
      app.username=null;
      app.loadme=true;
    }
  });

   this.doLogin=function(loginData){
     app.loading=true;
     app.errorMsg=false;
     Auth.login(app.loginData).then(function(data){
      app.role=data.data.role;
       if(data.data.success)
       {
         app.loading=false;
         app.successMsg=data.data.message + '...redirecting to profile page';

         $timeout(function(){
           if(data.data.role)
         $location.path('/managerprofile');
         else {
           $location.path('/studentprofile');
         }
         app.loginData=null;
         app.successMsg=false;
         },2000);

       }
       else {
         app.loading=false;
         app.errorMsg=data.data.message;
       }
     });

};
this.logout=function(){
  Auth.logout();
  $location.path('/logout');
  $timeout(function(){
    $location.path('/home');
  },2000);
};
});
