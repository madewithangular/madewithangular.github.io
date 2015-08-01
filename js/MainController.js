app.controller('MainController', ['$scope', 'projects', function($scope, projects) {
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
  });
}]);


