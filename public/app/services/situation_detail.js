angular.module('MyApp')
  .factory('SituationDetail', ['$resource', '$auth', 'railsResourceFactory', 'SituationType', 'SituationKind', 
    function($resource, $auth, railsResourceFactory, SituationType, SituationKind) {
      var resource = railsResourceFactory({
        url: $auth.apiUrl() + '/situation_details', 
        name: 'situation_detail',
        interceptors: ['setPagingHeadersInterceptor']
      });

      resource.name_plural = 'Detalhes de Situação';
      resource.name_single = 'Detalhe de Situação';
      resource.this_plural = 'os';
      resource.this_single = 'o';
      resource.resource_type = 'SituationDetail';
      resource.fields = { 
        situation_type: Entity.createCustomField('Tipo', 'situation_type', 'belongs', true, EntityField.getBelongsName, EntityField.getBelongsID)
          .setOptionLoader(function(field, entity) {
            return SituationType.query();
          }),
        situation_kind: Entity.createCustomField('Natureza', 'situation_kind', 'belongs', true, EntityField.getBelongsName, EntityField.getBelongsID)
          .setOptionLoader(function(field, entity) {
            var situation_type_id = entity.situation_type ? entity.situation_type.id : entity.situation_type_id;
            if (!situation_type_id || situation_type_id == null)
              situation_type_id = 0;
            return SituationKind.query({ situation_type_id: situation_type_id });
          }).addDependency('situation_type')
      }
      resource.fields_before = [ resource.fields.situation_type, resource.fields.situation_kind ];
      resource.fields_after = [];

      return resource;
  }]);