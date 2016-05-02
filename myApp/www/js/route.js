// 控制路由跳转
// 引入$stateProvider（）, $urlRouterProvider

angular.module('starter.rotue', [
  'tab.route',
  'home.route',
  'goodList.route',
  'cart.route'
])

.config(function($stateProvider, $urlRouterProvider) {


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
