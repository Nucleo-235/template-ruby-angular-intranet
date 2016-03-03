angular.module('MyApp')
  .filter('isAllPermission', function () {
    return function (input) {
      if (input) {
        return input.building_id == null;
      } else {
        return false;
      }
    };
  })

  .filter('hasAllPermission', function ($filter) {
    return function (permissions, permissionBuildings) {
      if (permissions) {
        if (permissions.length == 1 && $filter('isAllPermission')(permissions[0]))
          return true;

        if (permissionBuildings.length == 0)
          return true;

        return false;
      } else {
        return false;
      }
    };
  })

  .filter('onlyBuildingsNotUsed', function () {
    return function (buildings, permissions) {
      if (buildings) {
        if (permissions) {
          var permissionBuildings = [];
          for (var i=0; i < buildings.length; i++) {
            var building = buildings[i];
            var currentPermissions = jQuery.grep(permissions, function( p ) {
              return p.building_id == building.id;
            });
            if (currentPermissions.length == 0) {
              permissionBuildings.push(building);
            }
          }
          return permissionBuildings;
        } else
          return buildings.splice(0);
      } else {
        return [];
      }
    };
  });