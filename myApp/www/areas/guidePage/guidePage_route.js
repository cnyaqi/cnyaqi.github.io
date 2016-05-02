// 子路由模块
// 这里需要用到GuidePageCtrl,, 需要引用吗??
angular.module('guidePage.route', ['guidePage.controller'])
  .config(['$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('guidePage', {
          url: '/guidePage',
          templateUrl: 'areas/guidePage/itcast.html',
          controller: 'GuidePageCtrl'
        })
    }
  ])
