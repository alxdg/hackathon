var app = angular.module('myApp', []);

app.controller('queueCtrl', function ($scope, $http, $interval) {
  $interval(function () {
    $http.get('/queue').then(function (response) {
      $scope.queue = response.data;

      if (response.data.length === 0) {
        $scope.currentPlayer = 'If you want to play tweet to #GMRMarketing';
      } else {
        $scope.currentPlayer = response.data[0].User;
      }

    });
  }, 1000);
});
