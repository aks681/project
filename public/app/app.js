angular.module('userApp',['appRoutes','postServices','listController','userControllers','userServices','managementController','fileModelDirective','customerController','mainController','authServices'])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors'); //intercepts all http request and attaches token header

});
