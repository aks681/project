angular.module('userServices',[])
.factory('User',function($http){
  userfactory = [];
//  User.create(regData);
  userfactory.create=function(regData){
    return  $http.post('/api/users',regData);
  };

userfactory.getPermission = function(){
   return $http.get('/api/permission/');
};

userfactory.getUsers = function(){
  return $http.get('/api/management/');
};

userfactory.getPending = function(){
  return $http.get('/api/pending');
};

userfactory.getApproved = function(){
  return $http.get('/api/approved');
};

userfactory.rejectUser=function(object){
  return $http.put('/api/addreject',object);
}

userfactory.approveUser=function(object){
  return $http.put('/api/addapprove',object);
}

userfactory.getRejected = function(){
  return $http.get('/api/rejected');
};


return userfactory;
});
