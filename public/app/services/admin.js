angular.module('MyApp')
  .factory('Admin', ['$resource',
    function($resource) {
      return $resource('http://localhost:3000/admins/:id', { id: '@id' }, {
        update: {
          method: 'PUT', params:{id:'@id'} // this method issues a PUT request
        }
      });
  }]);