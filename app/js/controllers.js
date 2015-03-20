'use strict'

var ladderControllers = angular.module('ladderControllers', ['ladderFactories', 'ngSanitize']);

ladderControllers.controller('PlayerListCtrl', ['$scope', '$http', 'focus', 
    function ($scope, $http, focus) {
        $scope.jobs = [
        {
            job: "中到證他晚可溫價信選1",
            company: 'Luyou1',
            commision: 100000
        },
        {
            job: "力滿如生竟有的師",
            company: 'Luyou1',
            commision: 4003000
        },
        {
            job: "在。給曾的指時長。點以",
            company: 'Luyou1',
            commision: 500000
        },
        {
            job: "可溫價信選過高般看受全足查理",
            company: 'Luyou1',
            commision: 1001000
        }
        ];
        
    }]);

ladderControllers.controller('PlayerDetailCtrl', ['$scope', '$routeParams', 
    function ($scope, $routeParams) {
        $scope.player = $routeParams.playerId;
    }]);


ladderControllers.controller('RegistrationCtrl', function($scope, $rootScope, $http, $location) {
    $scope.user = {};
    $scope.register = function() {
        if ($scope.newPlayer){
            var maxRank = 0;
            console.log($scope.players);
            angular.forEach($scope.players, function (player) {
                if (player.rank > maxRank) {
                    maxRank = player.rank;
                    console.log(maxRank);
                }
            });
            var newPlayer = new Player({
                name: $scope.newPlayer,
                rank: maxRank + 1
            });
            newPlayer.save(function(err, result){
                /** result is undefined since model.save() does not return value */
                console.log(newPlayer._id);  // print out: _id value
                newPlayer.remove(); // remove this user from database
            }, function(err){
                /** if something went wrong */
                console.log(err)
            });
            $scope.players.push(newPlayer);
        };
    };
});

ladderControllers.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
    $scope.user = {};
    $scope.login = function() {
        console.log('Called login');
        $http.post('/login', {
            username: $scope.user.username,
            password: $scope.user.password,
        })
        .success(function(user) {
            $rootScope.message = 'Authentication successfull';
            $location.url('/admin');
        })
        .error(function() {
            console.log('We had an error');
            $rootScope.message = 'Authentication failed';
            $location.url('/login');
        });
    };
});