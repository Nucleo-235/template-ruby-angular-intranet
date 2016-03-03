angular.module('MyApp')
  .filter('buildingOptionPlaceholder', function () {
    return function (buildings, constructor, loadingBuildings, emptyText, selectText, selectConstructor) {
      if (constructor) {
        if (loadingBuildings)
          return 'Carregando ... ';
        else if (buildings.length == 0)
          return emptyText;
        else
          return selectText ? selectText : '- Selecione uma Obra -';
      } else {
        return selectConstructor ? selectConstructor : '- Selecione uma Construtora primeiro -';
      }
    };
  });