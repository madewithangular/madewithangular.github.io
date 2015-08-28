app.controller('HomeController', ['$scope', 'projects', function($scope, projects) {
  projects.success(function(data) {
    $scope.all_projects = data.reverse();

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

    $scope.menu = {
      category: null,
      availableCategories: [
        {name: 'Google', tag: 'google', preposition: 'by'},
        {name: 'Business', tag: 'business', preposition: 'for'},
        {name: 'Communication', tag: 'communication', preposition: 'for'},
        {name: 'Education', tag: 'education', preposition: 'for'},
        {name: 'Lifesyle', tag: 'lifestyle', preposition: 'for'},
        {name: 'Media & Video', tag: 'media-video', preposition: 'for'},
        {name: 'News & Magazines', tag: 'news-magazines', preposition: 'for'},
        {name: 'Photography', tag: 'photography', preposition: 'for'},
        {name: 'Shopping', tag: 'shopping', preposition: 'for'},
        {name: 'Tools', tag: 'tools', preposition: 'for'},
        {name: 'Travel & Local', tag: 'travel-local', preposition: 'for'},
        {name: 'Weather', tag: 'weather', preposition: 'for'}
      ]
    }

  });
}]);