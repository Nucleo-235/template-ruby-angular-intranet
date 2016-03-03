angular.module('MyApp')
  .controller('ImageModalCtrl', 
    function($scope, $uibModalInstance, image) {
      $scope.image = image;

      $scope.close = function () {
        $uibModalInstance.dismiss('close');
      };
    }
  );