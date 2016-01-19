angular.module('MyApp')
  .factory('SpotOwner', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/spot_owners/:id', { id: '@id' }, {
        update: {
          method: 'PUT', params:{id:'@id'} // this method issues a PUT request
        }
      });
  }]);