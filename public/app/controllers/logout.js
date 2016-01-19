angular.module('MyApp')
  .controller('LogoutCtrl', function($location, $auth, toastr) {
    if (!$auth.userIsAuthenticated()) { 
      $location.path('/login');
      return; 
    }
    $auth.signOut()
      .then(function() {
        toastr.info('You have been logged out');
        $location.path('/login');
      });
  });