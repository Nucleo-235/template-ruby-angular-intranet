angular.module('MyApp')
  .controller('HomeCtrl', function($scope, $http, toastr) {
    // $http.get('http://localhost:3000/spot_owners')
    //   .success(function(data) {
    //     var list = data;
    //     if (list) {
    //       $scope.stars = list.length;
    //       $scope.forks = list.length;
    //       $scope.issues = list.length;
    //     }
    //   })
    //   .catch(function(error) {
    //     toastr.error(error.data.message, error.status);
    //   })
  });