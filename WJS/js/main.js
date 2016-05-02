/*
 * @Author: iceStone
 * @Date:   2015-12-05 21:48:05
 * @Last Modified by:   iceStone
 * @Last Modified time: 2015-12-11 17:41:49
 */

'use strict';

$(function() {


  function resize() {
    var windowWidth = $(window).width();
    var smallScreen = windowWidth < 768;
    var $itemImages = $('#home_slide .item-image');
    $itemImages.each(function(i, item) {
      var $item = $(item);
      var imgSrc = $item.data(smallScreen ? 'image-small' : 'image-large');
      var imgAlt = $item.data('image-alt');
      $item.html('<img src="' + imgSrc + '" alt="' + imgAlt + '"/>');
      $item.css('backgroundImage', 'url(' + imgSrc + ')');
    });

    var $tabs = $('.nav-tabs');
    $tabs.each(function(i, item) {
      var $tab = $(this);
      var width = 20;
      $tab.children().each(function(ci, citem) {
        width += $(citem).width();
      });
      if (width > $tab.parent().width()) {
        $tab.css('width', width);
        $tabs.parent().css('overflow-x', 'scroll');
      } else {
        $tab.css('width', 'auto');
        $tabs.parent().css('overflow-x', 'hidden');
      }
    });
  }

  var OFFSET = 50;
  $('.carousel').each(function(i, item) {
    var startX, endX;
    item.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e) {
      endX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchend', function(e) {
      var offsetX = endX - startX;
      if (offsetX > OFFSET) {
        // 上一张
        $(this).carousel('prev');
      } else if (offsetX < -OFFSET) {
        // 上一张
        $(this).carousel('next');
      }
      e.preventDefault();
    });
  });

  $(window).on('resize', resize).trigger('resize');

  // 提示框效果
  $('[data-toggle="tooltip"]').tooltip();

  $('.news-nav a').click(function(e) {
    // 不要阻止默認事件
    $('.news-title').text($(this).data('title'));

  });
});
