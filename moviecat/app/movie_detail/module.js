'use strict';

angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.services.http'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id', {
        templateUrl: 'movie_detail/view.html',
        controller: 'MovieDetailController'
    });
}])

.controller('MovieDetailController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $route, $routeParams, HttpService) {
         
        $scope.loading = true;
        $scope.title = 'loading...';
        $scope.movies = {};
        HttpService
            .jsonp(
                'http://api.douban.com/v2/movie/subject/' + $routeParams.id, {},
                function(data) {
                    $scope.loading = false;
                    $scope.title = data.title;
                    $scope.movie = data;

                    $scope.$apply();
                }
            );

    }
]);
