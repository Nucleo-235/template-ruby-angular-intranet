angular.module('MyApp')
  .controller('SidebarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.userIsAuthenticated();
    };
  });