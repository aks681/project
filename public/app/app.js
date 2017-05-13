angular.module('userApp',['appRoutes','userControllers','userServices','mainController','authServices'])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors'); //intercepts all http request and attaches token header 

});
