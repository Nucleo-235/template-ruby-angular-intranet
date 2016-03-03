angular.module('MyApp')
  .controller('ConstructorIndexCtrl', ['$scope', 'Constructor', 'toastr', '$state',function($scope, Constructor, toastr, $state) {
    $scope.getEntities = function() {
      Constructor.all().$promise.then(function(data) {
        $scope.entitiesList = data;
      }, function(error) {
        toastr.error(error.data.message, error.status);
      });
    }

    $scope.deleteEntity = function(entityToBeDeleted) { // Delete a movie. Issues a DELETE to /api/movies/:id
      if (confirm('Tem certeza que deseja remover essa Construtora?')) {
        entityToBeDeleted.$delete(function() {
          $scope.getEntities();
        });
      }
    };
    
    $scope.getEntities();
  }]);

angular.module('MyApp')
  .controller('ConstructorNewCtrl', ['$scope', 'Constructor', '$location', 'toastr', '$previousState',function($scope, Constructor, $location, toastr, $previousState) {
    $scope.entry = new Constructor({name: ''});

    $scope.saveEntity = function() {
      $scope.entry.$save(function() {
        toastr.success('Construtora nova salva com sucesso.');
        $previousState.go();
      });
    };
  }]);

angular.module('MyApp')
  .controller('ConstructorEditCtrl', ['$scope', 'Constructor', '$location', 'toastr', '$stateParams', '$previousState',function($scope, Constructor, $location, toastr, $stateParams, $previousState) {
    Constructor.get({id: $stateParams.id}).$promise.then(function(data) {
      $scope.entry = data;
    }, function(error) {
      toastr.error(error.data.message, error.status);
    });

    $scope.saveEntity = function() {
      $scope.entry.$update(function() {
        toastr.success('Construtora atualizada com sucesso.');
        $previousState.go();
      });
    };
  }]);
