angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'ng-token-auth', 'ngFileUpload'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('manage', {
        url: '/manage',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('manage.home', {
        url: '/home',
        templateUrl: 'app/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('manage.profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('manage.admins', {
        url: '/admins',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('manage.admins.index', {
        url: '/',
        templateUrl: 'app/views/admins/index.html',
        controller: 'AdminIndexCtrl'
      })
      .state('manage.admins.new', {
        url: '/new',
        templateUrl: 'app/views/admins/new.html',
        controller: 'AdminNewCtrl'
      })
      .state('manage.admins.edit', { //state for updating a movie
        url: '/edit/:id',
        templateUrl: 'app/views/admins/edit.html',
        controller: 'AdminEditCtrl'
      });
      // .state('manage.spot_owners', {
      //   url: '/spot_owners',
      //   abstract: true,
      //   template: '<ui-view/>'
      // })
      // .state('manage.spot_owners.index', {
      //   url: '/',
      //   templateUrl: 'app/views/spot_owners/index.html',
      //   controller: 'SpotOwnerIndexCtrl'
      // })
      // .state('manage.spot_owners.new', {
      //   url: '/new',
      //   templateUrl: 'app/views/spot_owners/new.html',
      //   controller: 'SpotOwnerNewCtrl'
      // })
      // .state('manage.spot_owners.edit', { //state for updating a movie
      //   url: '/edit/:id',
      //   templateUrl: 'app/views/spot_owners/edit.html',
      //   controller: 'SpotOwnerEditCtrl'
      // })
      // .state('manage.spots', {
      //   url: '/spots',
      //   abstract: true,
      //   template: '<ui-view/>'
      // })
      // .state('manage.spots.index', {
      //   url: '/:spot_owner_id',
      //   templateUrl: 'app/views/spots/index.html',
      //   controller: 'SpotIndexCtrl'
      // })
      // .state('manage.spots.new', {
      //   url: '/new/:spot_owner_id',
      //   templateUrl: 'app/views/spots/new.html',
      //   controller: 'SpotNewCtrl'
      // })
      // .state('manage.spots.edit', { //state for updating a movie
      //   url: '/edit/:id',
      //   templateUrl: 'app/views/spots/edit.html',
      //   controller: 'SpotEditCtrl'
      // });

    $urlRouterProvider.otherwise('/manage/home');

    $authProvider.configure({
          apiUrl: 'http://localhost:3000'
      });

    // $authProvider.baseUrl = 'http://localhost:3000/';
    // $authProvider.loginUrl = '/auth/sign_in';
    // $authProvider.signupUrl = '/auth/sign_up';
    // $authProvider.unlinkUrl = '/auth/sign_out';

    // $authProvider.facebook({
    //   clientId: '657854390977827'
    // });

    // $authProvider.google({
    //   clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    // });

    // $authProvider.github({
    //   clientId: '0ba2600b1dbdb756688b'
    // });

    // $authProvider.linkedin({
    //   clientId: '77cw786yignpzj'
    // });

    // $authProvider.instagram({
    //   clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1'
    // });

    // $authProvider.yahoo({
    //   clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
    // });

    // $authProvider.twitter({
    //   url: '/auth/twitter'
    // });

    // $authProvider.live({
    //   clientId: '000000004C12E68D'
    // });

    // $authProvider.twitch({
    //   clientId: 'qhc3lft06xipnmndydcr3wau939a20z'
    // });

    // $authProvider.bitbucket({
    //   clientId: '48UepjQDYaZFuMWaDj'
    // });

    // $authProvider.oauth2({
    //   name: 'foursquare',
    //   url: '/auth/foursquare',
    //   clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
    //   redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    //   authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    // });

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.userIsAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.userIsAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  });