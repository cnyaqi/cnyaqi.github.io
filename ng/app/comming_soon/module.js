(function(angular) {
        'use strict';

    angular.module('movecat.comming_soon', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/comming_soon/:page?', {
            templateUrl: 'comming_soon/view.html',
            controller: 'comming_soonCtrl'
        });
    }])

    .controller('comming_soonCtrl', [
        '$scope',
        '$route', 
        '$routeParams',
        'HttpService',
        function($scope, $route, $routeParams, HttpService) {
            var pageSize = 5; // 每页显示几条
            $scope.page = parseInt($routeParams.page || 1);
            var start = ($scope.page - 1) * 5;
            $scope.total = 0; // 总共有几条
            $scope.average=0; // 影评
             
            $scope.loading = true;
            $scope.title = 'loading...';
            $scope.movies = [];
            HttpService
                .jsonp(
                    'http://api.douban.com/v2/movie/coming_soon', {
                        start: start,
                        count: pageSize
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
})(angular)
