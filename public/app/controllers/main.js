angular.module('MyApp')
  .controller('MainCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.userIsAuthenticated();
    };
  });