(function(window) {


	window.addEventListener('load', load);

	function load() {
		scroll();
		scrollPic();
	}

	// 顶部动画
	function scroll() {
		// 普通写法
		// var height = document.getElementsByClassName('jd_banner')[0].offsetHeight;
		// var header = document.getElementsByClassName('jd_header')[0];
		// window.addEventListener('scroll', scroll);
		// function scroll() {
		// 	var top = document.body.scrollTop;
		// 	var opt = 0;
		// 	if ( top <= height ) {
		// 		opt = top / height * 0.85
		// 	} else {
		// 		opt = 0.85;
		// 	}
		// 	header.style.backgroundColor = 'rgba(201, 21, 35, ' + opt + ')';
		// }


		// 面向对象的写法
		ya({
			dom: document.getElementsByClassName('jd_header')[0], // 改变的dom对象
			height: document.getElementsByClassName('jd_banner')[0].offsetHeight, // 相对于的高度
			opacity: 0.85 // 透明度
		}).scrollTop();
	}

	// 轮播动画
	function scrollPic() {
		var parentEle = document.getElementsByClassName( 'jd_banner' )[ 0 ];
		var picBox = parentEle.getElementsByTagName( 'ul' )[ 0 ];
		var pointBox = parentEle.getElementsByTagName( 'ul' )[ 1 ];
		var pointList = pointBox.getElementsByTagName('li');


		var timer = null, // 定时器
			index = 1, // 索引
			width = parentEle.offsetWidth;

		timer = setInterval(function() {
			index++;
			picBox.style.transition = 'all .3s ease';
			picBox.style.transform = 'translateX('+ -index * width +'px)';
		}, 2000);


		picBox.addEventListener('transitionend', function() {
			if ( index >= 9 ) {
				index = 1;
				picBox.style.transition = 'none';
				picBox.style.transform = 'translateX('+ -index * width +'px)';
			}
			if ( index <= 0 ) {
				index =  8;
				picBox.style.transition = 'none';
				picBox.style.transform = 'translateX('+ -index * width +'px)';
			}
			setPoint();
		});



		// 小圆点动起来
		function setPoint() {
			for ( var i = 0, length = pointList.length; i < length; i++ ) {
				pointList[i].className = ' ';
			}
			var pointIndex = index;
			if ( pointIndex >= 9 ) {
				pointIndex = 1;
			} 
			if ( pointIndex <= 0 ) {
				pointIndex = 8;
			}
			pointList[ pointIndex - 1 ].className = 'now';
		}

		var startX = 0, endX = 0, distanceX = 0;
		picBox.addEventListener('touchstart', function(e) {
			clearInterval(timer);
			startX = e.touches[0].clientX;
		});

		picBox.addEventListener('touchmove', function(e) {
			e.preventDefault()
			endX = e.touches[0].clientX;
			distanceX = startX - endX;

			picBox.style.transition = 'none';

			picBox.style.transform = 'translateX('+ (-index * width - distanceX) +'px)';

		});

		picBox.addEventListener('touchend', function(e) {
			if ( Math.abs(distanceX) > 1/3 * width && endX != 0 ) {
				if ( distanceX > 0 ) {
					index ++;
				} else {
					index --;
				}
			} 
			picBox.style.transition = 'all .3s ease';
			picBox.style.transform = 'translateX(' + (-index * width) + 'px)';


			// 防止多次绑定setInterval
			clearInterval(timer);
			timer = setInterval(function() {
				index++;
				picBox.style.transition = 'all .2s  ease';
				picBox.style.transform = 'translateX(' + -index * width + 'px)';
			}, 2000);

			startX = 0;
			endX = 0;
			distanceX = 0;
		});
	}

})(window);




(function(window) {
	function $ ( option ) {
		this.config = option;
	}
	$.prototype = {
		constructor: $,
		// scrollTop, 顶部动画
		scrollTop: function() {
			var _that = this
			window.addEventListener( 'scroll', function() {
				var top = document.body.scrollTop,  // 被卷去的距离
				opt = 0; // 每次变化透明度

				if ( top <= _that.config.height ) {
					opt = top / _that.config.height * _that.config.opacity;
				} else {
					opt = _that.config.opacity;
				}
				_that.config.dom.style.backgroundColor = 'rgba(201, 21, 35, ' + opt + ')';
			});
			return this;
		},
		addTansition: function() {
			
		}

	};






	window.ya = function( option ) {
		return new $( option );
	}

})(window);