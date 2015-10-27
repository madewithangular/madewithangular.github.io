var app = angular.module('mwaApp', ['ngRoute']);

app.factory('projects', ['$http', function($http) {
  return $http.get('https://s3.amazonaws.com/madewithangular.com/projects-test.json').success(function(data) {
    return data;
  }).error(function(data) {
    return data;
  });
}]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    controller: "HomeController",
    templateUrl: "static/views/home.html"
  }).when('/categories/:category', {
    controller: 'CategoryController',
    templateUrl: 'static/views/category.html'
  }).when('/sites/:site', {
    controller: 'SiteController',
    templateUrl: 'static/views/site.html'
  }).otherwise({
    redirectTo: '/'
  });
}]); 

app.controller('HomeController', ['$scope', 'projects', function($scope, projects) {
  projects.success(function(data) {
    $scope.allProjects = data;

    var allCategories = {
      "google": {name: "By Google", sites: []},
      "books-reference": {name: "Books & Reference", sites: []},
      "business": {name: "Business", sites: []},
      "communication": {name: "Communication", sites: []},
      "education": {name: "Education", sites: []},
      "entertainment": {name: "Entertainment", sites: []},
      "finance": {name: "Finance", sites: []},
      "health-fitness": {name: "Health & Fitness", sites: []},
      "lifestyle": {name: "Lifestyle", sites: []},
      "media-video": {name: "Media & Video", sites: []},
      "music-audio": {name: "Music & Audio", sites: []},
      "news-magazines": {name: "News & Magazines", sites: []},
      "photography": {name: "Photography", sites: []},
      "productivity": {name: "Productivity", sites: []},
      "shopping": {name: "Shopping", sites: []},
      "social": {name: "Social", sites: []},
      "sports": {name: "Sports", sites: []},
      "tools": {name: "Tools", sites: []},
      "travel-local": {name: "Travel & Local", sites: []},
      "transportation": {name: "Transportation", sites: []},
      "weather": {name: "Weather", sites: []},
      "community": {name: "From the Community", sites: []}
    }

    // sort projects into categories
    for(var i=0; i<$scope.allProjects.length; i++) {
      var p = $scope.allProjects[i];
      for(var j=0; j<p.tags.length; j++) {
        allCategories[p.tags[j]].sites.push(p);
      }
    }

    // randomize category order
    var keys = Object.keys(allCategories);
    keys.sort(function() { return 0.5 - Math.random() });
    $scope.allCategories = {};
    for(var i=0; i<keys.length; i++) {
      $scope.allCategories[keys[i]] = allCategories[keys[i]];
    }

    // randomize site order and limit to 4
    for(var key in $scope.allCategories) {
      if($scope.allCategories[key].sites.length === 0) {
        continue;
      }
      $scope.allCategories[key].sites.sort(function() { return 0.5 - Math.random() });
      $scope.allCategories[key].featuredSites = $scope.allCategories[key].sites.slice(0,4);
    }
  });
}]);

app.controller('CategoryController', ['$scope', 'projects', '$routeParams', function($scope, projects, $routeParams) {
  projects.success(function(data) {
    $scope.pageTitle = "Categories";

    console.log($scope.pageTitle);

    var allProjects = data;

    var allCategories = {
      "google": {name: "By Google", sites: []},
      "books-reference": {name: "Books & Reference", sites: []},
      "business": {name: "Business", sites: []},
      "communication": {name: "Communication", sites: []},
      "education": {name: "Education", sites: []},
      "entertainment": {name: "Entertainment", sites: []},
      "finance": {name: "Finance", sites: []},
      "health-fitness": {name: "Health & Fitness", sites: []},
      "lifestyle": {name: "Lifestyle", sites: []},
      "media-video": {name: "Media & Video", sites: []},
      "music-audio": {name: "Music & Audio", sites: []},
      "news-magazines": {name: "News & Magazines", sites: []},
      "photography": {name: "Photography", sites: []},
      "productivity": {name: "Productivity", sites: []},
      "shopping": {name: "Shopping", sites: []},
      "social": {name: "Social", sites: []},
      "sports": {name: "Sports", sites: []},
      "tools": {name: "Tools", sites: []},
      "travel-local": {name: "Travel & Local", sites: []},
      "transportation": {name: "Transportation", sites: []},
      "weather": {name: "Weather", sites: []},
      "community": {name: "From the Community", sites: []}
    }
    
    var selectedCategory = $routeParams.category;

    // find projects of that category
    var projectsByCategory = [];
    for(var i=0; i<allProjects.length; i++) {
      var p = allProjects[i];
      for(var j=0; j<p.tags.length; j++) {
        if(p.tags[j] === selectedCategory) {
          projectsByCategory.push(p);
        }
      }
    }
    projectsByCategory.reverse();

    $scope.category = {
      slug: selectedCategory,
      name: allCategories[selectedCategory].name,
      sites: projectsByCategory,
    }

  });
}]);

app.controller('SiteController', ['$scope', '$location', '$anchorScroll', 'projects', '$routeParams', function($scope, $location, $anchorScroll, projects, $routeParams) {
  projects.success(function(data) {
    $location.hash('top');
    $anchorScroll;

    var allProjects = data;

    var selectedSite = $routeParams.site;

    // find the site, based on the slug
    $scope.site = {}
    var sitesByCategory = [];
    for(var i=0; i<allProjects.length; i++) {
      var p = allProjects[i];
      if(p.slug === selectedSite) {
        $scope.site = p;
      }
      if(p.tags.indexOf("community") === -1) {
        sitesByCategory.push(p);
      }
    }

    $scope.moreSites = [];
    for(var i=0; i<4; i++) {
      var random_index = Math.floor(Math.random() * (sitesByCategory.length));
      $scope.moreSites.push(sitesByCategory[random_index]);
    }
  });
}]);