angular.module('MyApp')
  .controller('SpotOwnerIndexCtrl', ['$scope', 'SpotOwner', 'toastr', '$state',function($scope, SpotOwner, toastr, $state) {
    $scope.getEntities = function() {
      SpotOwner.query().$promise.then(function(data) {
        $scope.entitiesList = data;
      }, function(error) {
        toastr.error(error.data.message, error.status);
      });
    }

    $scope.deleteEntity = function(entityToBeDeleted) { // Delete a movie. Issues a DELETE to /api/movies/:id
      if (confirm('Tem certeza que deseja remover essa Estúdio?')) {
        entityToBeDeleted.$delete(function() {
          $scope.getEntities();
        });
      }
    };
    
    $scope.getEntities();
  }]);

angular.module('MyApp')
  .controller('SpotOwnerNewCtrl', ['$scope', 'SpotOwner', '$location', 'toastr', '$previousState',function($scope, SpotOwner, $location, toastr, $previousState) {
    $scope.entry = new SpotOwner({name: ''});

    $scope.saveEntity = function() {
      $scope.entry.$save(function() {
        toastr.success('Estúdio nova salva com sucesso.');
        $previousState.go();
      });
    };
  }]);

angular.module('MyApp')
  .controller('SpotOwnerEditCtrl', ['$scope', 'SpotOwner', '$location', 'toastr', '$stateParams', '$previousState',function($scope, SpotOwner, $location, toastr, $stateParams, $previousState) {
    SpotOwner.get({id: $stateParams.id}).$promise.then(function(data) {
      $scope.entry = data;
    }, function(error) {
      toastr.error(error.data.message, error.status);
    });

    $scope.saveEntity = function() {
      $scope.entry.$update(function() {
        toastr.success('Estúdio atualizada com sucesso.');
        $previousState.go();
      });
    };
  }]);
