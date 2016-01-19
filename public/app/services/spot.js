angular.module('MyApp')
  .factory('Spot', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/spots/:id', { id: '@id' }, {
        update: { method: 'PUT' },
        query: { 
          method: 'GET', isArray:true, 
          url: 'http://localhost:3000/spots?spot_owner_id=:spot_owner_id',
          params: { spot_owner_id: '@spot_owner_id' }
        }
      });
  }]);