// 通过angular.module.config定义成模块
// 注入$IonicConfigProvider服务

angular.module('starter.config', [])
  .config(function($ionicConfigProvider) {
  	$ionicConfigProvider.platform.android.tabs.position('bottom');
  	$ionicConfigProvider.platform.ios.tabs.position('bottom');
  });