app.controller('MainController', ['$scope', 'projects', function($scope, projects) {
  projects.success(function(data) {
    $scope.projects = data;
  });
}]);