angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $location, $auth, toastr) {
    $scope.login = function() {
      $auth.submitLogin($scope.user)
        .then(function() {
          toastr.success('Logado com sucesso!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.reason == "unauthorized") {
            console.log(error);
            toastr.error('Usuário e/ou senha inválidos', error.status);
          } else {
            console.log(error);
            processFailureErrors(error, $scope, $scope.loginForm);  
          }
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('Logado com sucesso usando ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            toastr.error(error.error);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
  });
