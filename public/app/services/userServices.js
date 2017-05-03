angular.module('userServices',[])
.factory('User',function($http){
  userfactory = [];
//  User.create(regData);
  userfactory.create=function(regData){
    return  $http.post('/api/users',regData);
  };
  return userfactory;
});
