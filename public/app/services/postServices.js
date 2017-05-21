angular.module('postServices',[])
.factory('Post',function($http){
  postfactory=[];

  postfactory.getPosts=function(){
    return $http.get('/api/posts');
  };

  postfactory.create=function(post){
    return  $http.post('/api/post',post);
  };

  postfactory.addtopost=function(object){
    return $http.put('/api/apply',object);
  };

  postfactory.deletePost = function(id){
    return $http.delete('/api/management/' + id);
  };

  postfactory.getP = function(id){
    return $http.get('/api/getpost/' + id);
  };

  postfactory.reject = function(user){
    return $http.delete('/api/rejectuser?' + $.param({"id": user.id,"username": user.username}));
  };

  postfactory.approve = function(user){
    return $http.put('/api/approveuser',user);
  };

  postfactory.editPost = function(id){
  return $http.put('/api/edit',id);
  };

  postfactory.getPost = function(id){
    return $http.get('/api/edit/' + id);
  };

  return postfactory;
});
