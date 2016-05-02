angular.module('goodList.route', ['goodList.controller'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('goodList', {
				url: '/goodList/:typeNumber',
				templateUrl: 'areas/goodsList/goodList.html',
				controller: 'GoodListCtrl'
			})
	});