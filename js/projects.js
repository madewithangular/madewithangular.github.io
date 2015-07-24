app.factory('projects', ['$http', function($http) {
  return $http.get('projects/projects.json')
            .success(function(data) {
              return data;
            })
            .error(function(data) {
              return data;
            });
}]);