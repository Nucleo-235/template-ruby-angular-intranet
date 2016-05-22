angular.module('MyApp')
  .factory('Account', function($rootScope, $http, $auth, $log, Upload) {
    function setImageUrl(user, image){
      if (user && image) {
        if (image.hasOwnProperty('image') && image.image)
          user.image = image.image;// caso uma esteja dentro da outra (erro Carrierwave)
        else
          user.image = image;

        if (user.image.hasOwnProperty('url') && user.image.url && user.image.url.length > 0)
          user.image_full_url = user.image.url[0] == '/' ? $auth.apiUrl() + user.image.url : user.image.url;
      }
    }

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
        setImageUrl(user, user.image);
      },
      setImageFullUrlAsync: function(user) {
        $http({ method: 'GET', url: $auth.apiUrl() + '/me' })
          .then(function(response) {
            setImageUrl(user, response.data.image);
          }, function(response) {
            $log.info('Erro callback on setImageFullUrlAsync at: ' + new Date());
          });
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
      Account.setImageFullUrlAsync(user);
    });

    $rootScope.$on('auth:login-success', function(ev, user) {
      setRoleProperties(user);
      Account.setImageFullUrlAsync(user);
    });

    $rootScope.mainAccount = Account;
    
  }]);