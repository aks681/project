angular.module('authServices',[])
.factory('Auth',function($http){
  authfactory = [];
//  User.create(loginData);
  authfactory.login=function(loginData){
    return  $http.post('/api/authenticate',loginData);
  };
  return authfactory;
});
