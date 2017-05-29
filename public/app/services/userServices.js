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

userfactory.remove=function(user){
  return $http.delete('/api/removereject?' + $.param({"id": user.id,"username": user.username}));
};

userfactory.getUsers = function(){
  return $http.get('/api/management/');
};

userfactory.getPending = function(){
  return $http.get('/api/pending');
};

userfactory.uploadfile = function(object){
  return $http.post('/api/uploadfile',object);
};

userfactory.download = function(object){
  return $http.get('/api/download?' + $.param({"id": object.id,"username": object.username}),{responseType: 'arraybuffer'});
};

userfactory.fileremove = function(object){
  return $http.delete('/api/removefile?' + $.param({"id": object.id,"username": object.username}));
};

userfactory.upload=function(file) {
  var fd= new FormData();
  fd.append('image',file.upload);   //image is the name given to the browse label and file.upload contains the data as it is the call to the fileModel.js
  return $http.post('/upload',fd,{
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined }  //To make the form data in a valid type so as to send to server in a usable format as Angular serialises it
  });
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
