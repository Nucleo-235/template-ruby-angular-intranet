function CRUDIndex($scope, $state, toastr, resource, standard_route) {
  var self = this;
  this.$scope = $scope;
  this.$state = $state;
  this.toastr = toastr;

  this.$scope.standard_route = standard_route;
  this.$scope.mainResource = resource;

  this.$scope.currentPage = 1;
  this.$scope.numPerPage = 10;
  this.$scope.maxSize = 20;

  this.$scope.loadEntities = function() {
    return self.loadEntities();
  };
  this.$scope.deleteEntity = function(entity) {
    return self.deleteEntity(entity);
  };
  this.$scope.editEntity = function(entity) {
    return self.editEntity(entity);
  };
  this.$scope.newEntity = function() {
    return self.newEntity();
  };

  $scope.pageChanged = function() {
    return self.loadEntities();
  };

  this.loadEntities();
};

CRUDIndex.prototype.loadEntities = function() {
  var self = this;
  return self.$scope.mainResource.query({page: self.$scope.currentPage, per_page: self.$scope.numPerPage}).then(function(data) {
      self.$scope.totalCount = data.total;
      self.$scope.entities = data;
    }, function(error) {
      self.toastr.error(error.data.message, error.status);
    });
};
CRUDIndex.prototype.deleteEntity = function(entityToBeDeleted) {
  var self = this;
  if (confirm('Tem certeza que deseja remover esse(a) ' + self.$scope.mainResource.name_single + '?')) {
    entityToBeDeleted.delete().then(function() {
      self.loadEntities();
    });
  }
};
CRUDIndex.prototype.editEntity = function(entity) {
  var self = this;
  var route = self.$scope.standard_route + '.edit';
  self.$state.go(route, {id: entity.id});
};
CRUDIndex.prototype.newEntity = function() {
  var self = this;
  var route = self.$scope.standard_route + '.new';
  self.$state.go(route);
};

function CRUDEdit($scope, $state, $stateParams, $previousState, toastr, resource, standard_route) {
  var self = this;
  this.$scope = $scope;
  this.$state = $state;
  this.$previousState = $previousState;
  this.toastr = toastr;

  this.$scope.standard_route = standard_route;
  this.$scope.mainResource = resource;

  $scope.formData = { };

  this.loadEntity($stateParams.id);

  this.$scope.saveEntity = function() {
    return self.saveEntity();
  }
};
CRUDEdit.prototype.loadEntity = function(id) {
  var self = this;
  self.$scope.mainResource.get(id).then(function(data) {
    self.$scope.entry = data;

    loadFormLists(self.$scope);
  }, function(error) {
    toastr.error(error.data.message, error.status);
  });
};
CRUDEdit.prototype.saveEntity = function() {
  var self = this;
  var _error = function(error) {
    self.toastr.error(error.data.message, error.status);
  };

  var _success = function() {
    self.toastr.success(self.$scope.mainResource.name_single + ' salvo(a) com sucesso.');
    self.$previousState.go();
  };

  setChildrenIDs(self.$scope);
  return self.$scope.entry.save().then(_success, _error);
};

function CRUDNew($scope, $state, $stateParams, $previousState, toastr, resource, standard_route) {
  var self = this;
  this.$scope = $scope;
  this.$state = $state;
  this.$previousState = $previousState;
  this.toastr = toastr;

  this.$scope.standard_route = standard_route;
  this.$scope.mainResource = resource;

  $scope.formData = { };

  this.$scope.entry = new resource( { name: '' });
  loadFormLists(this.$scope);

  this.$scope.saveEntity = function() {
    return self.saveEntity();
  }
};
CRUDNew.prototype.saveEntity = function() {
  var self = this;
  var _error = function(error) {
    self.toastr.error(error.data.message, error.status);
  };

  var _success = function() {
    self.toastr.success(self.$scope.mainResource.name_single + ' salvo(a) com sucesso.');
    self.$previousState.go();
  };

  setChildrenIDs(self.$scope);
  return self.$scope.entry.save().then(_success, _error);
};

function getSelectedById(list, id) {
  return list.first_or_null(function(item) {
    return item.id == id;
  });
}

function loadFormList(formData, field, entry) {
  var property = field.property;
  formData[property + '_loading'] = true;
  formData[property + '_waiting'] = false;
  field.loadOptions(entry).then(function(data) {
    formData[property + '_list'] = data;
    formData[property + '_loading'] = false;
    if (entry.hasOwnProperty(property)) {
      var selected = entry[property];
      var index = data.indexof(selected);
      if (index == -1)
        entry[property] = getSelectedById(data, selected.id);
    } else if (entry.hasOwnProperty(property + '_id')) {
      entry[property] = getSelectedById(data, entry[property + '_id']);
    }
  });
};

function onDependentChanged(dependencyData, entity, evChange, evClear) {
  var dependents = dependencyData.dependents;
  for (var i = 0; i < dependents.length; i++) {
    var dependentField = dependents[i];
    if (dependentField.isReadyForLoading(entity))
      evChange(dependentField, entity);
  }
}

function loadFormLists($scope) {
  var dependecyData = loadDependnecies($scope.mainResource);
  $scope.dependencyMap = dependecyData.dependencyMap;

  for (var fieldProperty in $scope.dependencyMap) {
    $scope.$watch('entry.' + fieldProperty, function(newValue) {
      onDependentChanged($scope.dependencyMap[fieldProperty], $scope.entry, function(field, entity) {
        loadFormList($scope.formData, field, entity);
      }, function(field, entity) {
        $scope.formData[field.property + '_disabled'] = false;
        $scope.formData[field.property + '_list'] = [];
      });
    }); 
  }

  for (var i = 0; i < dependecyData.dependents.length; i++) {;
    var field = dependecyData.dependents[i];
    $scope.formData[field.property + '_disabled'] = false;
  }

  for (var i = 0; i < dependecyData.notDependents.length; i++) {;
    var field = dependecyData.notDependents[i];
    if (field.hasOptionLoader())
      loadFormList($scope.formData, field, $scope.entry);
  }
};

function setChildrenIDs($scope) {
  for (var i = 0; i < $scope.mainResource.fields_before.length; i++) {
    var field = $scope.mainResource.fields_before[i];
    if (field.hasOptionLoader())
      $scope.entry[field.property + '_id'] = field.value($scope.entry).id;
  }
  for (var i = 0; i < $scope.mainResource.fields_after.length; i++) {
    var field = $scope.mainResource.fields_after[i];
    if (field.hasOptionLoader())
      $scope.entry[field.property + '_id'] = field.value($scope.entry).id;
  }
};

function loadDependnecies(resource) {
  var result = { notDependents: [], dependents: [], dependencyMap: {} }

  function checkList(result, fields) {
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (field.hasDependencies()) {
        result.dependents.push(field);
        for (var d = 0; d < field.dependencies.length; d++) {
          var dependecy_property = field.dependencies[d];
          if (result.dependencyMap.hasOwnProperty(dependecy_property))
            result.dependencyMap[dependecy_property].dependents.push(field);
          else
            result.dependencyMap[dependecy_property] = { dependents: [ field ], field: resource.fields[dependecy_property] }
        }
      }
      else 
        result.notDependents.push(field);
    }
  }

  checkList(result, resource.fields_before);
  checkList(result, resource.fields_after);

  return result
}

function initDefaultCRUD($state, $injector) {
  var standard_route = $state.current.name;

  var stateParts = $state.current.name.split('.');
  var action = stateParts[stateParts.length - 1]
  var resourceName = null;;
  if (action == 'index' || action == 'new' || action == 'edit') {
    resourceName = stateParts[stateParts.length - 2];
    standard_route = stateParts.splice(0, stateParts.length - 1).join('.');
  }
  
  var resource = $injector.get(Entity.routeToResourceMap[resourceName]);

  return { resource: resource, standard_route: standard_route };
};


angular.module('MyApp')
  .controller('DefaultCRUDIndexCtrl', function($scope, $injector, $state, toastr, ROUTE_PREFIX) {
      var initResult = initDefaultCRUD($state, $injector);
      $scope.CTRL = new CRUDIndex($scope, $state, toastr, initResult.resource, initResult.standard_route);
  });

angular.module('MyApp')
  .controller('DefaultCRUDEditCtrl', function($scope, $injector, $state, $stateParams, $previousState, toastr, ROUTE_PREFIX) {
      var initResult = initDefaultCRUD($state, $injector);
      $scope.CTRL = new CRUDEdit($scope, $state, $stateParams, $previousState, toastr, initResult.resource, initResult.standard_route);
  });

angular.module('MyApp')
  .controller('DefaultCRUDNewCtrl', function($scope, $injector, $state, $stateParams, $previousState, toastr, ROUTE_PREFIX) {
      var initResult = initDefaultCRUD($state, $injector);
      $scope.CTRL = new CRUDNew($scope, $state, $stateParams, $previousState, toastr, initResult.resource, initResult.standard_route);
  });