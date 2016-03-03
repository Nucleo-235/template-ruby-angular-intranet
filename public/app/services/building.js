angular.module('MyApp')
  .factory('Building', ['$resource', '$auth',
    function($resource, $auth) {
      return $resource($auth.apiUrl() + '/buildings/:id', { id: '@id' }, {
        update: { method: 'PUT' },
        query: { 
          method: 'GET', isArray:true, 
          url: $auth.apiUrl() + '/buildings?constructor_id=:constructor_id',
          params: { constructor_id: '@constructor_id' }
        },
        summarized: { 
          method: 'GET', isArray:true, 
          url: $auth.apiUrl() + '/buildings/summarized'
        },
        all: { 
          method: 'GET', isArray:true, 
          url: $auth.apiUrl() + '/buildings/all'
        }
      });
  }]);