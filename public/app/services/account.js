angular.module('MyApp')
  .factory('Account', function($rootScope, $http, $auth, Upload) {
    return {
      updateProfile: function(profileData) {
        return $auth.updateAccount(profileData);
      },
      updateImage: function(image) {
        return Upload.upload({
            url: 'http://localhost:3000/users/update_image',
            method: 'POST',
            headers: $auth.retrieveData('auth_headers'),
            data: { image: image }
          });
      },
      setImageFullUrl: function(user) {
        if (user.image && user.image.hasOwnProperty('url') && user.image.url.length > 0)
          user.image_full_url = "http://localhost:3000" + user.image.url;
      }
    };
  });

  angular.module('MyApp')
  .run(['$rootScope', 'Account', function($rootScope, Account) {
    $rootScope.$on('auth:logout-success', function(ev, user) {
      Account.setImageFullUrl(user);
    });
    $rootScope.$on('auth:validation-success', function(ev, user) {
      Account.setImageFullUrl($rootScope.user);
    });
    
  }]);