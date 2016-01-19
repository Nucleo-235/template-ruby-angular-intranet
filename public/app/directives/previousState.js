angular.module('MyApp')
    .service("$previousState", 
      [ '$rootScope', '$state', 
        function($rootScope, $state) {
          var previous = null;
          var memos = {};
          var defaultPreviousState;

          var lastPrevious = null;

          $rootScope.$on("$stateChangeStart", function(evt, toState, toStateParams, fromState, fromStateParams) {
            lastPrevious = previous;
            previous = { state: fromState, params: fromStateParams };
          });

          $rootScope.$on("$stateChangeError", function() {
            previous = lastPrevious;
            lastPrevious = null;
          });

          $rootScope.$on("$stateChangeSuccess", function() {
            lastPrevious = null;
          });

          var $previousState = {
            get: function(memoName) {
              return memoName ? memos[memoName] : previous; 
            },
            go: function(memoName) {
              var to = $previousState.get(memoName);
              if (to.state.abstract)
                return $state.go(defaultPreviousState.state, defaultPreviousState.params)
              else
                return $state.go(to.state, to.params)
            },
            memo: function(memoName) {
              memos[memoName] = previous; 
            },
            setDefaultPreviousStateName: function(defaultPreviousStateName, defaultPreviousStateParams) {
              defaultPreviousState = { state: defaultPreviousStateName, params: defaultPreviousStateParams }; 
            }
          };

      return $previousState;
    }]);

angular.module('MyApp').run(['$previousState', function($previousState) {
      "use strict";
      // Inject in .run so it can register $rootScope.$on.

      $previousState.setDefaultPreviousStateName('manage.home');
    }]);