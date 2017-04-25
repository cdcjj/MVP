var app = angular.module('myApp', [
  'myApp.services',
  'myApp.authenticate',
  'myApp.inventory',
  'ngRoute'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    // requireBase: false
  });
  $routeProvider
  .when('/login', {
    templateUrl: "app/views/login.html",
    controller: 'AuthenticateController'
  })
  .when('/signup', {
    templateURL: "app/views/signup.html",
    controller: 'AuthenticateController'
  })
  .when('/inventory', {
    templateURL: "app/views/inventory",
    controller: 'InventoryController'
  })
  .otherwise('/', {
    redirectTo: '/inventory',
  });

}]);
