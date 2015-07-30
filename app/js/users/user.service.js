(function() {
  'use strict';

  angular.module('CodeBytes')

  .service('UserService', ['$http', '$location', '$auth', '$window', '$rootScope', '$sce', '$stateParams',

    function ($http, $location, $auth, $window, $rootScope, $sce, $stateParams) {

      var token = $auth.getToken();
      var currentUser = JSON.parse(localStorage.getItem("currentUser"));
      var user = function(){
        if (token !== undefined) {
          console.log(currentUser);
          return JSON.parse($window.localStorage.currentUser);
        } else {
          return null;
        }
      };

      var idFunc = function(){
          if ($stateParams.id === undefined){
            return user().user_id;
          } else {
            return $stateParams.id;
          }
        };

      var isLoggedIn = function() {
        if (token !== null){
          return true;
        } else {
          return false;
        }
      };

      this.ghLogin = function() {
        $auth.authenticate('github')
          .then(function(response) {
            $window.localStorage.currentUser = JSON.stringify(response.data.user);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            $rootScope.token = token;
            $location.path('/');
          })
          .catch(function(response) {
          });
      };

      this.getAvatar = function() {

        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser !== null) {
          return $sce.trustAsHtml('<img class="avatar" src="' + currentUser.avatar + '">');
        } else {
          return $sce.trustAsHtml('<i class="fa fa-user fa-2x portrait"></i>');
        }
      };

      this.avatarUrl = function() {

        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser !== null){
          return '/#/myprofile';
        } else {
          return '/#/login';
        }
      };

      this.logOut = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
        $rootScope.token = null;
        $location.path('/');
      };

      this.thisUser = function() {
        return $http({
          url: 'https://pacific-hamlet-4796.herokuapp.com/me',
          headers: {
            'Authorization': token
          },
          method: 'GET'
        });
      };

      this.getUser = function(){

        // Defines AJAX params for users
        var id = idFunc();
        var userReq = {
          url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + id,
          headers: {
            'Authorization': token
          },
          method: 'GET'
        };
        return $http(userReq);
      };

      this.getPosts = function(){

        var id = idFunc();

        console.log(id);

        var postReq = {
          url: 'https://pacific-hamlet-4796.herokuapp.com/users/' + id + '/posts',
          headers: {
            'Authorization': token
          },
          method: 'GET'
        };
        return $http(postReq);
      };

    }

  ]);

}());
