angular.module('MyApp')
  .factory('Account', function($rootScope, $http, $auth, Upload) {
    return {
      updateProfile: function(profileData) {
        return $auth.updateAccount(profileData);
      },
      updateImage: function(image) {
        return Upload.upload({
            url: $auth.apiUrl() + '/users/update_image',
            method: 'POST',
            headers: $auth.retrieveData('auth_headers'),
            data: { image: image }
          });
      },
      setImageFullUrl: function(user) {
        if (user && user.image && user.image.hasOwnProperty('url') && user.image.url && user.image.url.length > 0)
          user.image_full_url = $auth.apiUrl() + user.image.url;
      },
      isAdmin: function(user) {
        var type = user.type;
        return type == 'Admin';
      }
    };
  });

angular.module('MyApp')
  .run(['$rootScope', 'Account', function($rootScope, Account) {
    $rootScope.$on('auth:logout-success', function(ev, user) {
      Account.setImageFullUrl(user);
    });

    function setRoleProperties(user) {
      if (!(user.hasOwnProperty("isAdmin"))) {
        user.isAdmin = Account.isAdmin(user);
      }
    }

    $rootScope.$on('auth:validation-success', function(ev, user) {
      setRoleProperties(user);
      Account.setImageFullUrl(user);
    });

    $rootScope.$on('auth:login-success', function(ev, user) {
      setRoleProperties(user);
      Account.setImageFullUrl(user);
    });

    $rootScope.mainAccount = Account;
    
  }]);