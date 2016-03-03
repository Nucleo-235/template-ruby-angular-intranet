angular.module('MyApp')
  .factory('Constructor', ['$resource', '$auth',
    function($resource, $auth) {
      return $resource($auth.apiUrl() + '/constructors/:id', { id: '@id' }, {
        update: {
          method: 'PUT', params:{id:'@id'} // this method issues a PUT request
        },
        all: { 
          method: 'GET', isArray:true, 
          url: $auth.apiUrl() + '/constructors/all'
        }
      });
  }]);