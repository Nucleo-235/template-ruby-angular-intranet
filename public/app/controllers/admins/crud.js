angular.module('MyApp')
  .controller('AdminIndexCtrl', ['$scope', 'Admin', 'toastr', '$state',function($scope, Admin, toastr, $state) {
    $scope.getEntities = function() {
      Admin.query().$promise.then(function(data) {
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
  .controller('AdminNewCtrl', ['$scope', 'Admin', '$location', 'toastr', '$previousState',function($scope, Admin, $location, toastr, $previousState) {
    $scope.entry = new Admin({name: ''});

    $scope.saveEntity = function() {
      $scope.entry.$save(function() {
        toastr.success('Admin novo salvo com sucesso.');
        $previousState.go();
      });
    };
  }]);

angular.module('MyApp')
  .controller('AdminEditCtrl', ['$scope', 'Admin', '$location', 'toastr', '$stateParams', '$previousState',function($scope, Admin, $location, toastr, $stateParams, $previousState) {
    Admin.get({id: $stateParams.id}).$promise.then(function(data) {
      $scope.entry = data;
    }, function(error) {
      toastr.error(error.data.message, error.status);
    });

    $scope.saveEntity = function() {
      $scope.entry.$update(function() {
        toastr.success('Admin atualizado com sucesso.');
        $previousState.go();
      });
    };
  }]);
