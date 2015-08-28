var app = angular.module('mwaApp', ['infinite-scroll', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: "HomeController",
      templateUrl: "views/home.html"
    })
    .otherwise({
      redirectTo: '/'
    });
}]);