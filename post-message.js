(function() {
'use strict';

angular.module("ngPostMessage", [])
  .directive('track', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('load', function(evt) {
          scope.frames[attrs.track] = evt.target.contentWindow;
        });
      }
    };
  }])
	.directive('html', ['$window', 'postMessage', function($window, postMessage) {
    return {
      restrict: 'E',
      link: (function(scope, elem, attrs) {
        if (postMessage.frames) {
          scope.frames = postMessage.frames; // reuse
        } else {
          scope.frames = postMessage.frames = {}; // global mapper
        }
        angular.element($window).bind('message', function(evt) {
          evt = evt.originalEvent || evt;
          if (evt && evt.data) {
            try {
              scope.$root.$broadcast('$messageIncoming', angular.fromJson(evt.data));
            } catch (_error) {
              // ignore error
            }
          }
        });
      })
    };
  }])
	.factory("postMessage", ['$rootScope', '$window', function($rootScope, $window) {
    var pm = {
      recv: function(callback) {
        $rootScope.$on('$messageIncoming', function(evt, data) {
          $rootScope.$apply(callback(evt, data));
        });
      },
      post: function(id, message) {
        (pm.frames[id] || $window.parent).postMessage(message, '*');
      }
    };
    return pm;
  }])
;
})();