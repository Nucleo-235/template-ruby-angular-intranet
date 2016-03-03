angular.module('MyApp')
  .controller('BuildingIndexCtrl', ['$scope', 'Constructor', 'Building', 'toastr', '$stateParams',function($scope, Constructor, Building, toastr, $stateParams) {
    $scope.constructor = $stateParams.constructor_id;
    $scope.getEntities = function() {
      Building.all($stateParams).$promise.then(function(data) {
        $scope.entitiesList = data;

        if ($stateParams.constructor_id) {
          Constructor.get({id: $stateParams.constructor_id}).$promise.then(function(constructorData) {
            $scope.constructor = constructorData;
          }, function(error) {
            toastr.error(error.data.message, error.status);
          });
        }
      }, function(error) {
        toastr.error(error.data.message, error.status);
      });
    }

    $scope.deleteEntity = function(entityToBeDeleted) { // Delete a movie. Issues a DELETE to /api/movies/:id
      if (confirm('Tem certeza que deseja remover essa Obra?')) {
        entityToBeDeleted.$delete(function() {
          $scope.getEntities();
        });
      }
    };
    
    $scope.getEntities();
  }]);

angular.module('MyApp')
  .controller('BuildingNewCtrl', ['$scope', 'Constructor', 'Building', '$location', 'toastr', '$stateParams','$previousState', function($scope, Constructor, Building, $location, toastr, $stateParams,$previousState) {
    $previousState.setDefaultPreviousStateName('manage.buildings.index', { constructor_id: $stateParams.constructor_id} );

    Constructor.get({id: $stateParams.constructor_id}).$promise.then(function(data) {
      $scope.constructor = data;
      $scope.entry = new Building({name: '', constructor_id: data.id});
    }, function(error) {
      toastr.error(error.data.message, error.status);
      $previousState.go();
    });

    $scope.saveEntity = function() {
      $scope.entry.$save(function() {
        toastr.success('Obra nova salva com sucesso.');
        $previousState.go();
      });
    };
  }]);

angular.module('MyApp')
  .controller('BuildingEditCtrl', ['$scope', 'Constructor', 'Building', '$location', 'toastr', '$stateParams','$previousState', function($scope, Constructor, Building, $location, toastr, $stateParams, $previousState) {
    $previousState.setDefaultPreviousStateName('manage.buildings.index');

    Building.get({id: $stateParams.id}).$promise.then(function(data) {
      
      $scope.entry = data;

      $previousState.setDefaultPreviousStateName('manage.buildings.index', { constructor_id: $scope.entry.constructor_id} );
      Constructor.get({id: $scope.entry.constructor_id}).$promise.then(function(constructorData) {
        $scope.constructor = constructorData;
        $scope.entry.constructor = $scope.constructor;
      }, function(error) {
        toastr.error(error.data.message, error.status);
        $previousState.go();
      });

    }, function(error) {
      toastr.error(error.data.message, error.status);
      $previousState.go();
    });


    $scope.saveEntity = function() {
      $scope.entry.$update(function() {
        toastr.success('Obra atualizada com sucesso.');
        $previousState.go();
      });
    };
  }]);
