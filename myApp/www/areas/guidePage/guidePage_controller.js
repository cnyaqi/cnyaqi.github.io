// 引导页  业务逻辑

angular.module('guidePage.controller', ['guidePage.service'])
  .controller('GuidePageCtrl', [
    '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$state',
    function($scope, $ionicActionSheet, $timeout, $state) {

      var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical',
        // loop: true,
        autoplay: 2000,
        // 如果需要分页器
        pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
      });


      $scope.func_goHome = function() {
        $state.go('tab.home');
      }



      // Triggered on a button click, or some other target
      // $scope.show = function() {

      //   // Show the action sheet
      //   var hideSheet = $ionicActionSheet.show({
      //     buttons: [
      //       { text: '<b>Share</b> This' },
      //       { text: 'Move' }
      //     ],
      //     destructiveText: 'Delete',
      //     titleText: 'Modify your album',
      //     cancelText: 'Cancel',
      //     cancel: function() {
      //       // add cancel code..
      //     },
      //     buttonClicked: function(index) {
      //       console.log(index);
      //       return true;
      //     }
      //   });

      //   // For example's sake, hide the sheet after two seconds
      //   $timeout(function() {
      //     hideSheet();
      //   }, 2000);

      // };



      // $ionicModal.fromTemplateUrl('my-modal.html', {
      //   scope: $scope,
      //   animation: 'slide-in-up'
      // }).then(function(modal) {
      //   $scope.modal = modal;
      // });
      // $scope.openModal = function() {
      //   $scope.modal.show();
      // };
      // $scope.closeModal = function() {
      //   $scope.modal.hide();
      // };
      // //Cleanup the modal when we're done with it!
      // $scope.$on('$destroy', function() {
      //   $scope.modal.remove();
      // });
      // // Execute action on hide modal
      // $scope.$on('modal.hidden', function() {
      //   // Execute action
      // });
      // // Execute action on remove modal
      // $scope.$on('modal.removed', function() {
      //   // Execute action
      // });



    }
  ]);
