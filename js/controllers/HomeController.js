app.controller('HomeController', ['$scope', 'projects', '$routeParams', function($scope, projects, $routeParams) {
  projects.success(function(data) {
    
    $scope.availableCategories = [
      {name: 'Google', tag: 'google'},
      {name: 'Business', tag: 'business'},
      {name: 'Communication', tag: 'communication'},
      {name: 'Education', tag: 'education'},
      {name: 'Lifesyle', tag: 'lifestyle'},
      {name: 'Media & Video', tag: 'media-video'},
      {name: 'News & Magazines', tag: 'news-magazines'},
      {name: 'Photography', tag: 'photography'},
      {name: 'Shopping', tag: 'shopping'},
      {name: 'Tools', tag: 'tools'},
      {name: 'Travel & Local', tag: 'travel-local'},
      {name: 'Weather', tag: 'weather'}
    ];
    
    // routing
    $scope.category = $routeParams.category;
    $scope.categoryName = "";
    for (var i=0; i<$scope.availableCategories.length; i++) {
      if($scope.availableCategories[i].tag === $scope.category) {
        $scope.categoryName = $scope.availableCategories[i].name;
      }
    }

    // if a category is selected, filter projects on tags
    $scope.all_projects = []
    if($scope.category) {
      for(var i=0; i<data.length; i++) {
        if(data[i].tags.indexOf($scope.category) > -1) {
          $scope.all_projects.push(data[i])
        }
      }
    }
    else {
      $scope.all_projects = data.reverse();
    }

    // infinite scroll
    $scope.offset = 0;
    $scope.limit = 10;

    $scope.projects = $scope.all_projects.slice($scope.offset, $scope.limit);
    
    $scope.nextPage = function() {
      $scope.offset += $scope.limit;
      if($scope.offset < $scope.all_projects.length) {
        var nextProjects = $scope.all_projects.slice($scope.offset, $scope.offset+$scope.limit);
        $scope.projects = $scope.projects.concat(nextProjects);
      }
    }
  });

}]);