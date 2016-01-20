angular.module('MyApp')
    .directive('sidebarDirective', ['$rootScope', '$store', function($rootScope, $store) {
      return {
          link : function(scope, element, attr) { 
              var currentValue = $store.get('sidebar' + attr.sidebarDirective);
              var value = currentValue != null && currentValue;
              $rootScope['sidebar' + attr.sidebarDirective] = value;

              $rootScope.$watch('sidebar' + attr.sidebarDirective, function(newVal) {
                $store.set('sidebar' + attr.sidebarDirective, newVal)
                if(newVal)
                  element.removeClass(attr.sidebarCssHideClass); 
                else
                  element.addClass(attr.sidebarCssHideClass);
              });
          }
      };
  }]);  

angular.module('MyApp')
  .directive('sidebarTogglerDirective', ['$rootScope', function($rootScope) {
      return {
          link : function(scope, element, attr) {
              element[0].onclick = function() {
                $rootScope.$apply(function () {
                  if ($rootScope['sidebar' + attr.sidebarTogglerDirective])  {
                    $rootScope['sidebar' + attr.sidebarTogglerDirective] = false;
                  }
                  else {
                    $rootScope['sidebar' + attr.sidebarTogglerDirective] = true;
                  }
                });
                return false;
              };
          }
      };
  }]);  