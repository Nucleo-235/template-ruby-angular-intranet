function processFailureErrors(response, $scope, form) {
  angular.forEach(response.data, function(errors, key) {
    angular.forEach(errors, function(e) {
      form[key].$dirty = true;
      form[key].$invalid = true;
      form[key].$setValidity(e, false);
    });
  });
  $scope.$broadcast('show-errors-check-validity');
}