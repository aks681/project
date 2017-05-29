var app = angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider){
  $routeProvider.when('/',{
    templateUrl: 'app/views/pages/home.html'
  })
  .when('/register',{
    templateUrl: 'app/views/pages/user/register.html',
    controller: 'regCtrl',
    controllerAs: 'register',
    authenticated: false
  })
  .when('/login',{
    templateUrl:'app/views/pages/user/login.html',
    authenticated: false
  })
  .when('/customer',{
    templateUrl:'app/views/pages/customer/customer.html',
    controller: 'customerCtrl',
    controllerAs: 'customer',
    authenticated: true
  })
  .when('/logout',{
    templateUrl:'app/views/pages/user/logout.html',
    authenticated: true
  })
  .when('/profile',{
    templateUrl:'app/views/pages/user/mainpage.html',
    controller: 'customerCtrl',
    controllerAs: 'customer',
    authenticated: true
  })
  .when('/upload/:id',{
    templateUrl:'app/views/pages/customer/upload.html',
    controller: 'customerCtrl',
    controllerAs: 'customer',
    authenticated: true
  })
  .when('/addpost',{
    templateUrl:'app/views/pages/manage/addpost.html',
    controller: 'managementCtrl',
    controllerAs: 'manage',
    authenticated: true,
    permission: ['admin']
  })
  .when('/list/:id',{
    templateUrl:'app/views/pages/manage/list.html',
    controller: 'listCtrl',
    controllerAs: 'list',
    authenticated: true,
    permission: ['admin']
  })
  .when('/manage',{
    templateUrl:'app/views/pages/manage/manage.html',
    controller: 'managementCtrl',
    controllerAs: 'manage',
    authenticated: true,
    permission: ['admin']
  })
  .when('/edit/:id',{
    templateUrl:'app/views/pages/manage/edit.html',
    controller: 'editCtrl',
    controllerAs: 'edit',
    authenticated: true,
    permission: ['admin']
  })
  .when('/document/:username/:name/:identify',{
    templateUrl:'app/views/pages/manage/document.html',
    controller: 'listCtrl',
    controllerAs: 'list',
    authenticated: true,
    permission: ['admin']
  })
  .otherwise({redirectTo:'/'});

  $locationProvider.html5Mode({
    enabled:true,
    requireBase: false
  });
});

app.run(['$rootScope', 'User','Auth', '$location',function($rootScope,User,Auth,$location){

  $rootScope.$on('$routeChangeStart',function(event,next,current){

    if(next.$$route !== undefined){
      if(next.$$route.authenticated === true){
        if(!Auth.isLoggedIn()){
          event.preventDefault();
          $location.path('/');
        }
        else if(next.$$route.permission){
          User.getPermission().then(function(data){
            if(next.$$route.permission[0]!== data.data.permission){
              event.preventDefault();
              $location.path('/profile');
            }
          });
        }
      }
      else if(next.$$route.authenticated === false){
        if(Auth.isLoggedIn()){
          event.preventDefault();
          $location.path('/profile');
        }
      }
    }
  });
}]);
