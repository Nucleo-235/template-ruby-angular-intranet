angular.module('MyApp')
  .controller('SpotIndexCtrl', ['$scope', 'SpotOwner', 'Spot', 'toastr', '$stateParams',function($scope, SpotOwner, Spot, toastr, $stateParams) {
    $scope.spot_owner = $stateParams.spot_owner_id;
    $scope.getEntities = function() {
      Spot.query($stateParams).$promise.then(function(data) {
        $scope.entitiesList = data;

        if ($stateParams.spot_owner_id) {
          SpotOwner.get({id: $stateParams.spot_owner_id}).$promise.then(function(spot_ownerData) {
            $scope.spot_owner = spot_ownerData;
          }, function(error) {
            toastr.error(error.data.message, error.status);
          });
        }
      }, function(error) {
        toastr.error(error.data.message, error.status);
      });
    }

    $scope.deleteEntity = function(entityToBeDeleted) { // Delete a movie. Issues a DELETE to /api/movies/:id
      if (confirm('Tem certeza que deseja remover essa Sala?')) {
        entityToBeDeleted.$delete(function() {
          $scope.getEntities();
        });
      }
    };
    
    $scope.getEntities();
  }]);

angular.module('MyApp')
  .controller('SpotNewCtrl', ['$scope', 'SpotOwner', 'Spot', '$location', 'toastr', '$stateParams','$previousState', function($scope, SpotOwner, Spot, $location, toastr, $stateParams,$previousState) {
    $previousState.setDefaultPreviousStateName('manage.spots.index', { spot_owner_id: $stateParams.spot_owner_id} );

    SpotOwner.get({id: $stateParams.spot_owner_id}).$promise.then(function(data) {
      $scope.spot_owner = data;
      $scope.entry = new Spot({name: '', spot_owner_id: data.id});
    }, function(error) {
      toastr.error(error.data.message, error.status);
      $previousState.go();
    });

    $scope.saveEntity = function() {
      $scope.entry.$save(function() {
        toastr.success('Sala nova salva com sucesso.');
        $previousState.go();
      });
    };
  }]);

angular.module('MyApp')
  .controller('SpotEditCtrl', ['$scope', 'SpotOwner', 'Spot', '$location', 'toastr', '$stateParams','$previousState', function($scope, SpotOwner, Spot, $location, toastr, $stateParams, $previousState) {
    $previousState.setDefaultPreviousStateName('manage.spots.index');

    Spot.get({id: $stateParams.id}).$promise.then(function(data) {
      
      $scope.entry = data;

      $previousState.setDefaultPreviousStateName('manage.spots.index', { spot_owner_id: $scope.entry.spot_owner_id} );
      SpotOwner.get({id: $scope.entry.spot_owner_id}).$promise.then(function(spot_ownerData) {
        $scope.spot_owner = spot_ownerData;
        $scope.entry.spot_owner = $scope.spot_owner;
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
        toastr.success('Sala atualizada com sucesso.');
        $previousState.go();
      });
    };
  }]);
