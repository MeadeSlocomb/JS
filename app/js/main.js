(function() {
  'use strict';

  var baseEndpoint = 'https://pacific-hamlet-4796.herokuapp.com/';

  angular.module('CodeBytes', ['ui.router', 'ngMessages', 'satellizer', 'gist', 'ngTagsInput'])

  .constant('HEROKU', {
    URL: baseEndpoint + 'auth/',
    CONFIG: {
      headers: {
       'token' : ''
      }
    }
  })

  .config([ '$stateProvider', '$urlRouterProvider', '$authProvider',
    function ($stateProvider, $urlRouterProvider, $authProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'js/templates/login.tpl.html',
          controller: 'NavController'
        })
        .state('queriedFeed', {
          url: '/',
          templateUrl: 'js/templates/feed.tpl.html',
          controller: 'FeedController'
        })
        // .state('queriedFeed', {
        //   url: '/search/:params',
        //   templateUrl: 'js/templates/feed.tpl.html',
        //   controller: 'FeedController'
        // })
        .state('popPosts', {
          url: '/poptags/:tags',
          templateUrl: 'js/templates/feed.tpl.html',
          controller: 'PopularTagController'
        })
        .state('addpost', {
          url: '/addpost',
          templateUrl: 'js/templates/addpost.tpl.html',
          controller: 'AddPostController'
        })
        .state('post', {
          url: '/post/:id',
          templateUrl: 'js/templates/singlepost.tpl.html',
          controller: 'SinglePostController',
          resolve: {
            singlePostResolve: function (PostService, $stateParams) {
              return PostService.getPost($stateParams.id);
            }
          }
        })
        .state('editpost', {
          url: '/edit/:id',
          templateUrl: 'js/templates/editpost.tpl.html',
          controller: 'EditPostController'
        })
        .state('aboutteam', {
          url: '/aboutteam',
          templateUrl: 'js/templates/aboutteam.tpl.html',
          controller: 'FeedController'
        })
        .state('tech', {
          url: '/tech',
          templateUrl: 'js/templates/tech.tpl.html',
          controller: 'FeedController'
        })
        .state('profile', {
          url: '/myprofile',
          templateUrl: 'js/templates/myprofile.tpl.html',
          controller: 'UserController'
        })
        .state('userprofile', {
          url: '/profile/:id',
          templateUrl: 'js/templates/userprofile.tpl.html',
          controller: 'UserController'
        });


      $authProvider.github({
        clientId: '449fbb7bd7e7a0d47f9b',
      });
      $authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
      $authProvider.loginOnSignup = true;
      $authProvider.baseUrl = '/';  // API Base URL for the paths below.
      $authProvider.loginRedirect = '/';
      $authProvider.logoutRedirect = '/';
      $authProvider.signupRedirect = '/login';
      $authProvider.loginUrl = '/auth/login';
      $authProvider.signupUrl = '/auth/signup';
      $authProvider.loginRoute = '/login';
      $authProvider.signupRoute = '/signup';
      $authProvider.tokenRoot = false; // set the token parent element if the token is not the JSON root
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
      $authProvider.unlinkUrl = '/auth/unlink/';
      $authProvider.unlinkMethod = 'get';
      $authProvider.authHeader = 'Authorization';
      $authProvider.authToken = 'Bearer';
      $authProvider.withCredentials = true;
      $authProvider.platform = 'browser'; // or 'mobile'
      $authProvider.storage = 'localStorage'; // or 'sessionStorage'

      $authProvider.loginUrl = baseEndpoint + 'auth/login';

      $authProvider.github({
        url: baseEndpoint + 'auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
        scope: ['user'],
        scopeDelimiter: ',',
        type: '2.0',
        popupOptions: { width: 1020, height: 618 }
      });




    }

  ]);

  // .run(function($rootScope, $window, $auth) {
  //   if ($auth.isAuthenticated()) {
  //     $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
  //   }

  // });

}());
