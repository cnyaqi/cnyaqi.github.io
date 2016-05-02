angular.module('tab.route', ['tab.controller', 'home.route','category.route', 'guidePage.route', 'details.route', 'account.route'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('tab', {
				url: '/tab',
				abstract: true,
				templateUrl: 'areas/tab/tabs.html',
				controller: 'TabCtrl'
			});
	});