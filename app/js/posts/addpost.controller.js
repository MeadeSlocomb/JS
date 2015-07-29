(function () {
  'use strict';

  angular.module('CodeBytes')

  .controller('AddPostController', ['PostService', '$scope', '$location', '$http',

    function (PostService, $scope, $location, $http) {

      //Array of tag objects
      $scope.tags = [];
      $scope.xp = {
        text: ''
      };

      //New Post Method
      $scope.addPost = function (newPost) {
        $scope.tags.push($scope.xp);
        newPost.tags = $scope.tags;
        PostService.addNewPost(newPost)
          .success(function () {

          // Route Home
            $location.path('/');
            $scope.post = {};
          });
      };

      // Gets searchable tags from backend
      $scope.loadTags = function(query) {
        return $http.get('https://pacific-hamlet-4796.herokuapp.com/tags?search=' + query);
      };

    }

  ]);

}());
