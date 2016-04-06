angular.module('MyApp')
  .filter('nameByType', function () {
    return function (type, types, link) {
      var result = jQuery.grep(types, function( t ) { return t.type == type });
      if (result.length > 0 )
        return result.name;
      else
        return 'Inválido';
    };
  });

angular.module('MyApp')
  .filter('valueByType', function () {
    return function (type, types, link) {
      var result = jQuery.grep(types, function( t ) { return t.type == type });
      if (result.length > 0 )
        return result.valueFormatter(link);
      else
        return 'Inválido';
    };
  });