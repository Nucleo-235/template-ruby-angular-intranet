function EntityField(name, property, field_type, custom, evName, evIdentifier) {  
  this.name = name;
  this.property = property;
  this.field_type = field_type;
  this.isCustom = custom;
  this._evName = evName;
  this._evIdentifier = evIdentifier;
  this.evLoader = null;
  this.dependencies = [];
};
EntityField.prototype.value = function(entity) {
  if (entity && entity.hasOwnProperty(this.property)) {
    var baseValue = entity[this.property];
    var id = this._evIdentifier(this, entity, baseValue);
    var name = this._evName(this, entity, baseValue);
    return { id: id, name: name };
  } else {
    return null;
  }
};
EntityField.prototype.valueWithBase = function(entity, baseValue) {
  var id = this._evIdentifier(this, entity, baseValue);
  var name = this._evName(this, entity, baseValue);
  return { id: id, name: name };
};
EntityField.getPrimitiveValue = function(field, entity, baseValue) {
  return baseValue;
};
EntityField.getBelongsID = function(field, entity, baseValue) {
  return baseValue.id;
};
EntityField.getBelongsName = function(field, entity, baseValue) {
  return baseValue.name;
};
EntityField.prototype.setOptionLoader = function(evLoader, evIsReadyForLoading) {
  this.evLoader = evLoader;
  this.evIsReadyForLoading = evIsReadyForLoading;
  return this;
};
EntityField.prototype.hasOptionLoader = function(evLoader) {
  return this.evLoader != null;
};
EntityField.prototype.isReadyForLoading = function(entity) {
  return !this.evIsReadyForLoading || evIsReadyForLoading(this, entity);
};
EntityField.prototype.loadOptions = function(entity) {
  return this.evLoader(this, entity);
};
EntityField.prototype.addDependency = function(dependency) {
  this.dependencies.push(dependency);
  return this;
};
EntityField.prototype.hasDependencies = function() {
  return this.dependencies.length > 0;
};

function Entity() {  };
Entity.routeToResourceMap = { }

Entity.createStandardField = function(name, property, field_type, custom) {
  return new EntityField(name, property, field_type, custom, EntityField.getPrimitiveValue, EntityField.getPrimitiveValue);
};
Entity.createCustomField = function(name, property, field_type, custom, evName, evIdentifier) {
  return new EntityField(name, property, field_type, custom, evName, evIdentifier);
};
Entity.addCRUDRoutes = function($stateProvider, controller_type, prefix, route, resourceName) {
  Entity.routeToResourceMap[route] = resourceName;

  return $stateProvider
    .state(prefix + '.' + route, {
      url: '/' + route,
      abstract: true,
      template: '<ui-view/>'
    })
    .state(prefix + '.' + route + '.index', {
      url: '/',
      templateUrl: 'app/views/default/index.html',
      controller: controller_type + 'IndexCtrl'
    })
    .state(prefix + '.' + route + '.new', {
      url: '/new',
      templateUrl: 'app/views/default/new.html',
      controller: controller_type + 'NewCtrl'
    })
    .state(prefix + '.' + route + '.edit', { //state for updating a movie
      url: '/edit/:id',
      templateUrl: 'app/views/default/edit.html',
      controller: controller_type + 'EditCtrl'
    });
}