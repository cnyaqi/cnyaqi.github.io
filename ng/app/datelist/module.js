'use strict';

angular.module('movecat.datelist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page?', {
        templateUrl: 'datelist/view.html',
        controller: 'MoiveListController'
    });
}])

.controller('MoiveListController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $route, $routeParams, HttpService) {
        var pageSize = 5; // 每页显示几条
        $scope.page = parseInt($routeParams.page || 1);
        var start = ($scope.page - 1) * 5;
        $scope.total = 0; // 总共有几条
         
        $scope.loading = true;
        $scope.title = 'loading...';
        $scope.movies = {};
        HttpService
            .jsonp(
                'http://api.douban.com/v2/movie/' + $routeParams.category, 
                {
                    start: start,
                    count: pageSize,
                    q: $routeParams.q
                },
                function(data) {
                    $scope.loading = false;
                    $scope.title = data.title;
                    $scope.movies = data.subjects;
                    $scope.totalPage = Math.ceil(data.total / pageSize);    // 总共有几页

                    $scope.total = data.total; // 总共有几条
                    $scope.$apply();
                }
            );

        // 翻页行为
        $scope.goto = function (page) {
            if (0 < page && page < $scope.totalPage + 1)
                $route.updateParams({page: page});
        }
    }
]);
