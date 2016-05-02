'use strict';

// Declare app level module which depends on views, and components
angular.module('movecat', [
    'ngRoute',
    'moviecat.movie_detail',
    'movecat.datelist',
    'moviecat.services.http',
    /*'movecat.top250',
    'movecat.in_theater',
    'movecat.comming_soon',*/
    'moviecat.auto_active'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/in_theaters' });
}])
.controller('SearchController', [
    '$scope',
    '$route',
    function($scope, $route) {
        $scope.input = '';
        $scope.search = function () {
            $route.updateParams({ category: 'search', q: $scope.input});
        }
    }
]);
