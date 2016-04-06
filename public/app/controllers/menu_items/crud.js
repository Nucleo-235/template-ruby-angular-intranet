angular.module('MyApp')
  .controller('MenuItemIndexCtrl', ['$scope', 'MenuItem', 'toastr', '$stateParams',function($scope, MenuItem, toastr, $stateParams) {
    $scope.link_types = MenuItem.getLinkTypes();

    $scope.getEntities = function() {
      MenuItem.query($stateParams).then(function(data) {
        $scope.entitiesList = data;
      }, function(error) {
        toastr.error(error.data.message, error.status);
      });
    }

    $scope.deleteEntity = function(entityToBeDeleted) { // Delete a movie. Issues a DELETE to /api/movies/:id
      if (confirm('Tem certeza que deseja remover essa Item do Menu?')) {
        entityToBeDeleted.$delete(function() {
          $scope.getEntities();
        });
      }
    };
    
    $scope.getEntities();
  }]);

angular.module('MyApp')
  .controller('MenuItemNewCtrl', ['$scope', 'Page', 'MenuItem', '$location', 'toastr', '$stateParams','$previousState', function($scope, Page, MenuItem, $location, toastr, $stateParams,$previousState) {
    $previousState.setDefaultPreviousStateName('manage.menu_items.index');
    $scope.link_types = MenuItem.getLinkTypes();
    $scope.entry = new MenuItem({name: '', link: { type: $scope.link_types[0].type }});

    $scope.getPages = function() {
      Page.query().then(function(data) {
        $scope.pages = data;
      }, function(error) {
        toastr.error(error.data.message, error.status);
      });
    };

    $scope.saveEntity = function() {
      $scope.entry.save().then(function() {
        toastr.success('Novo Item do Menu criado com sucesso.');
        $previousState.go();
      });
    };
  }]);

angular.module('MyApp')
  .controller('MenuItemEditCtrl', ['$scope', 'Page', 'MenuItem', '$location', 'toastr', '$stateParams','$previousState', function($scope, Page, MenuItem, $location, toastr, $stateParams, $previousState) {
    $previousState.setDefaultPreviousStateName('manage.menu_items.index');
    $scope.link_types = MenuItem.getLinkTypes();

    MenuItem.get($stateParams.id).$promise.then(function(data) {
      $scope.entry = data;
    }, function(error) {
      toastr.error(error.data.message, error.status);
      $previousState.go();
    });


    $scope.saveEntity = function() {
      $scope.entry.save().then(function() {
        toastr.success('Item do Menu atualizado com sucesso.');
        $previousState.go();
      });
    };
  }]);
