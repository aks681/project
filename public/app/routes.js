angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl: 'app/views/pages/home.html'
  })
  .when('/about',{
    templateUrl:'app/views/pages/about.html'
  })
  .when('/register',{
    templateUrl: 'app/views/pages/user/register.html',
    controller: 'regCtrl',
    controllerAs: 'register'
  })
  .when('/login',{
    templateUrl:'app/views/pages/user/login.html'
  })
  .when('/logout',{
    templateUrl:'app/views/pages/user/logout.html'
  })
  .when('/managerprofile',{
    templateUrl:'app/views/pages/user/managerprofile.html'
  })
  .when('/studentprofile',{
    templateUrl:'app/views/pages/user/studentprofile.html'
  })
  .otherwise({redirectTo:'/'});

  $locationProvider.html5Mode({
    enabled:true,
    requireBase: false
  });
});
