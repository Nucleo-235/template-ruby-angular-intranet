angular.module('MyApp')
  .factory('Page', ['$resource', '$auth', 'railsResourceFactory', 
    function($resource, $auth, railsResourceFactory) {
      var resource = railsResourceFactory({
        url: $auth.apiUrl() + '/pages', 
        name: 'page',
        interceptors: ['setPagingHeadersInterceptor']
      });

      return resource;
  }]);