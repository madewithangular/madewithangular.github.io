var app = angular.module('mwaApp', ['infinite-scroll', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: "HomeController",
      templateUrl: "views/home.html"
    })
    .when('/categories/:category', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
    .when('/about', {
      controller: "AboutController",
      templateUrl: "views/about.html"
    })
    .otherwise({
      redirectTo: '/'
    });
}]);