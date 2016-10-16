var app = angular.module('mwaApp', ['ngRoute', 'angularLazyImg']);

app.factory('projects', ['$http', function($http) {
  return $http.get('https://s3.amazonaws.com/madewithangular.com/projects.json').success(function(data) {
    return data;
  }).error(function(data) {
    return data;
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    controller: "HomeController",
    templateUrl: "static/v/home.html"
  }).when('/sites/:site', {
    controller: 'HomeController',
    templateUrl: 'static/v/home.html'
  }).when('/about', {
    controller: 'HomeController',
    templateUrl: 'static/v/about.html'
  }).otherwise({
    redirectTo: '/'
  })
}]);

app.controller('HomeController', ['$scope', '$location', '$routeParams', 'projects', function($scope, $location, $routeParams, projects) {
  projects.success(function(data) {
    data.reverse();

    // filter by site
    if($routeParams.site) {
      console.log('site')
      var slug = $routeParams.site;
      $scope.allProjects = []
      for(var i=0; i<data.length; i++) {
        if(data[i].slug === slug) {
          $scope.allProjects.push(data[i]);
        }
      }
    }

    // filter by category
    else if($location.search().hasOwnProperty('cat')) {
      console.log('cat')
      var cat = $location.search()['cat'];
      $scope.allProjects = []
      for(var i=0; i<data.length; i++) {
        if(data[i].tags.indexOf(cat) > -1) {
          $scope.allProjects.push(data[i]);
        }
      }
    }

    else {
      console.log('all')
      $scope.allProjects = []
      for(var i=0; i<data.length; i++) {
        if(data[i].tags.indexOf("community") === -1) {
          $scope.allProjects.push(data[i]);
        }
      }
    }    

    $scope.sortByRecent = function() {
      $scope.allProjects.sort(function (a, b) {
        if (a.submissionDate < b.submissionDate) {
          return 1;
        }
        if (a.submissionDate > b.submissionDate) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    $scope.sortByAlphabetical = function() {
      $scope.allProjects.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    }
  });
}]);