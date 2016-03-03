angular.module('MyApp')
  .factory('SituationKind', ['$resource', '$auth', 'railsResourceFactory', 'SituationType',
    function($resource, $auth, railsResourceFactory, SituationType) {
      var resource = railsResourceFactory({
        url: $auth.apiUrl() + '/situation_kinds', 
        name: 'situation_kind',
        interceptors: ['setPagingHeadersInterceptor']
      });

      resource.name_plural = 'Naturezas';
      resource.name_single = 'Natureza';
      resource.this_plural = 'as';
      resource.this_single = 'a';
      resource.resource_type = 'SituationKind';
      resource.fields = {
        situation_type: Entity.createCustomField('Tipo', 'situation_type', 'belongs', true, EntityField.getBelongsName, EntityField.getBelongsID)
          .setOptionLoader(function(field, entity) {
            return SituationType.query();
          })
      };
      resource.fields_before = [ resource.fields.situation_type ];
      resource.fields_after = [];

      return resource;
  }]);