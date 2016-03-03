angular.module('MyApp')
  .factory('SituationType', ['$resource', '$auth', 'railsResourceFactory',
    function($resource, $auth, railsResourceFactory) {
      var resource = railsResourceFactory({
        url: $auth.apiUrl() + '/situation_types', 
        name: 'situation_type',
        interceptors: ['setPagingHeadersInterceptor']
      });
      resource.name_plural = 'Tipos';
      resource.name_single = 'Tipo';
      resource.this_plural = 'os';
      resource.this_single = 'o';
      resource.resource_type = 'SituationType';
      resource.fields = { };
      resource.fields_before = [];
      resource.fields_after = [];

      return resource;
  }]);