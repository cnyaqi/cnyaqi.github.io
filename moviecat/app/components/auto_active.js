

(function (angular) {
    angular.module('moviecat.auto_active', [])
    .directive('autoActive', ['$location', function ($location) {
        return {
            link: function (scope, element, attributes) {
                // 监听当前的url
                scope.$location = $location;
                scope.$watch('$location.url()', function (now, old) {
                    // 获取当前的href
                    var href = element.children().attr('href').substr(1);    
                    if (now.startsWith(href)) {
                        element.parent().children().removeClass(attributes.autoActive);
                        element.addClass(attributes.autoActive)
                    }
                })
                
            }
        }
    }])
})(angular)