var app = angular.module('myApp', []);

app.controller('queueCtrl', function ($scope, $http, $interval) {
   var poll;

   $scope.startPolling = function () {
      poll = $interval(function () {
         $http.get('/queue').then(function (response) {
            $scope.queue = response.data;

            if (response.data.length === 0) {
               //Pop modal window
               $scope.currentPlayer = '';
               $("#myModal").modal();
            } else {
               $("#myModal").modal('hide');
               $scope.currentPlayer = response.data[0].User;
            }
         });
      }, 1000);
   };

   $scope.stopPolling = function () {
      $interval.cancel(poll);
   };
});
