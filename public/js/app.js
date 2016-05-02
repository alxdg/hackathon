var app = angular.module('myApp', []);

app.controller('queueCtrl', function ($scope, $http, $interval) {
    var poll;

    $scope.startPolling = function () {
        poll = $interval(function () {
            $http.get('/queue').then(function (response) {
                $scope.queue = response.data;
                window.console.log('asdfasdfasdfasdf');
                if (response.data.length === 0) {
                    //Pop modal window
                    $scope.currentPlayer = '';
                    $scope.currentTweet = '';
                    $("#myModal").modal();
                } else {
                    $("#myModal").modal('hide');
                    $scope.currentPlayer = response.data[0].User;
                    $scope.currentTweet = response.data[0].Message;
                }
            }, function () {
                $scope.queue = [{
                        User: '#asdfasdf',
                        Message: 'asdfasdf asdfasdf asdfasdfas asdf'
                    }];
                $scope.currentPlayer = 'asdfasdf';
                $scope.currentTweet = '#GmrHackBox I want to win!!!!';
            });
        }, 1000);
    };

    $scope.stopPolling = function () {
        $interval.cancel(poll);
    };
});
