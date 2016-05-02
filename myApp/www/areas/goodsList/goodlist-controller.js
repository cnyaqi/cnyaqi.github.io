angular.module('goodList.controller', ['goodList.service'])
  .controller('GoodListCtrl', function($scope, $stateParams, $ionicLoading, GlobalVariable, GoodListFty, $ionicHistory) {

    // 列表数据
    $scope.obj_goodsListData = [];

    $scope.pms_isMoreItemsAvailable = false;
    // 分页查询对象
    $scope.obj_pagingInfo = {
      amountMax: "",
      amountMin: "",
      billNum: "",
      createUser: "",
      dateFrom: "",
      dateTo: "",
      deptID: "",
      deptName: "",
      keyWord: "",
      loginName: "",
      billType: "",
      pageNum: 1,
      pageSize: 10,
      sortFlag: "0",
      sortType: "desc",
      typeNumber: ""
    };

    $scope.$on('$ionicView.beforeEnter', function(e) {
      $scope.func_refreshGoodsList();
    });

    $scope.$on('$ionicView.enter', function(e) {
      $scope.pms_isMoreItemsAvailable = true;
    });


    $scope.func_refreshGoodsList = function() {

      // 每次刷新的时候让页面充值为1
      $scope.obj_pagingInfo.pageNum = 1;
      $scope.obj_pagingInfo.typeNumber = $stateParams.typeNumber;
      var message = JSON.stringify($scope.obj_pagingInfo);
      
      var promise = GoodListFty.refreshGoodsList(message);
      promise.then(
        function(data) {
          $scope.obj_goodsListData = data;
        },
        function(reason) {}).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.func_loadMoreGoodsList = function(message) {
      $ionicLoading.show({
        tempalte: '正在加载数据....'
      });
      $scope.obj_pagingInfo.pageNum = $scope.obj_pagingInfo.pageNum + 1;
      $scope.obj_pagingInfo.typeNumber = $stateParams.typeNumber;
      var message = JSON.stringify($scope.obj_pagingInfo);

      var promise = GoodListFty.loadMoreGoodsList();
      promise.then(function(data) {
        if(!data) {
          return $scope.pms_isMoreItemsAvailable = false; 
        }
        Array.prototype.push.apply($scope.obj_goodsListData, data);
      }, function(reason) {}).finally(function() {
        $scope.$broadcast('scroll.infiniteScrollComplete');
        setTimeout(function() {
          $ionicLoading.hide();
        }, 1000);
      })
    }

    // 返回方法
    $scope.func_goBack = function() {
      $ionicHistory.goBack();
    }

  })
