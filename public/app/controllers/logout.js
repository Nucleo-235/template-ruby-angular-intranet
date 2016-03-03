angular.module('MyApp')
  .controller('LogoutCtrl', function($location, $auth, toastr) {
    $auth.signOut()
      .then(function() {
        toastr.info('Desconectado do sistema com sucesso.');
        $location.path('/login');
      });
  });