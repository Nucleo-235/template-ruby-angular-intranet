angular.module('MyApp')
  .controller('ProfileCtrl', function($scope, $auth, $location, toastr, Account, Upload) {
    $scope.updateProfile = function() {
      $auth.updateAccount($scope.user)
        .then(function(response) {
          // $scope.user = response.data.data;
          $scope.saveImageIfChanged();
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.saveImageIfChanged = function() {
      // if (active_image) {
      // if (formProfile.active_image.$valid && $scope.active_image) {
      if ($scope.active_image) {
        $scope.upload = Account.updateImage($scope.active_image)
          .progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          })
          .success(function(data) {
            $scope.user.image= data.image;
            Account.setImageFullUrl($scope.user);
            
            $scope.active_image = null;

            toastr.success('Perfil atualizado com sucesso');
          })
          .error(function(response) {
            if (response.hasOwnProperty('message'))
              toastr.error(response.message, response.status);
            else
              toastr.error(response, response);
          });
      }
      else {
        toastr.success('Perfil atualizado com sucesso');
        $location.path('/');
      }
    };
  });
