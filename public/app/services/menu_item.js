angular.module('MyApp')
  .factory('MenuItem', ['$resource', '$auth', 'railsResourceFactory', 
    function($resource, $auth, railsResourceFactory) {
      var resource = railsResourceFactory({
        url: $auth.apiUrl() + '/menu_items', 
        name: 'menu_item',
        interceptors: ['setPagingHeadersInterceptor']
      });

      resource.getLinkTypes = function() {
        return [ { name: 'Link para Página', type: 'InternalLink', valueFormatter: function(link) { return link.page.name; }  },
          { name: 'Link Externo', type: 'ExternalLink', valueFormatter: function(link) { return link.url; }  }]
      }

      return resource;
  }]);