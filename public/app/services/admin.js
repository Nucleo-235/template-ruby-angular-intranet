angular.module('MyApp')
  .factory('Admin', ['$resource', '$auth',
    function($resource, $auth) {
      return $resource($auth.apiUrl() + '/admins/:id', { id: '@id' }, {
        update: {
          method: 'PUT', params:{id:'@id'} // this method issues a PUT request
        }
      });
  }]);