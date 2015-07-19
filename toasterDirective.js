/***********************************************************************
 * Toaster Directive
 * Author: Brenton Klik
 * 
 * Prerequisites:
 *  - AngularJS
 *  - styleSheetFactory (https://github.com/bklik/styleSheetFactory)
 * 
 * Description:
 * Control that messages can be sent to, and pops a temporary
 * dismiss-able, or actionable notification to the user.
/**********************************************************************/
angular.module('toasterDirective', ['styleSheetFactory'])

.directive('toasterDirective', ['$timeout', 'styleSheetFactory', function($timeout, styleSheetFactory) {
    return {
        scope: {
            api: '=',
        },
        restrict: 'E',
        template: '' +
            '<toast ng-repeat="toast in toasts" class="{{toast.type}}">' +
                '<message>{{toast.message}}</message>' +
                '<button ng-show="toast.type == \'undo\'" class="undo" ng-click="toast.callback()">Undo</button>' +
                '<button ng-show="toast.type != \'undo\'" class="close" ng-click="removeToast($index)">X</button>' +
            '</toast>',
        link: function($scope, $element, $attrs) {
            $scope.toasts = [];
            $scope.hadUndoTimer = false;

            // The document's stylesheet.
            var styleSheet = styleSheetFactory.getStyleSheet();

            // The prefix used by the browser for non-standard properties.
            var prefix = styleSheetFactory.getPrefix();

            // Add this directive's styles to the document's stylesheet.
            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive',
                'display: block;' +
                'z-index: 1;' +
                'max-width: 65%;' +
                'min-width: 65%;' +
                'overflow: visible;' +
                'position: fixed;' +
                'bottom: 8px;' +
                'left: 8px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast',
                'border-radius: 2px;' +
                'box-shadow: 0 2px 8px rgba(0, 0, 0, .25);' +
                'display: -'+prefix+'-flex;' +
                'display: -'+prefix+'-flexbox;' +
                'display: flex;' +
                '-'+prefix+'-flex-grow: 1;' +
                'flex-grow: 1;' +
                'margin: 0 0 8px 0;' +
                'padding: 8px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast message',
                '-'+prefix+'-flex-grow: 1;' +
                'flex-grow: 1;' +
                'line-height: 22px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast button',
                'background: rgba(0, 0, 0, .15);' +
                'border: none;' +
                'border-radius: 2px;' +
                'box-shadow: none;' +
                'height: 22px;' +
                'margin: 0 0 0 8px;' +
                'min-height: 22px;' +
                'padding: 0;' +
                'width: auto;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast .undo',
                'min-width: 50px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast .close',
                'min-width: 32px;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast.message, toaster-directive toast.undo',
                'background-color: dimgray;' +
                'color: #eee;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast.warning',
                'background-color: orange;' +
                'color: #333;'
            ,1);

            styleSheetFactory.addCSSRule(styleSheet, 'toaster-directive toast.error',
                'background-color: orangered;' +
                'color: #eee;'
            ,1);

            $scope.removeToast = function(index) {
                $scope.toasts.splice(index, 1);
            };

            $scope.addMessage = function(message) {
                var toast = {
                    type: 'message',
                    message: message,
                }
                $scope.toasts.push(toast);
            };

            $scope.addError = function(message) {
                var toast = {
                    type: 'error',
                    message: message,
                }
                $scope.toasts.push(toast);
            };

            $scope.addWarning = function(message) {
                var toast = {
                    type: 'warning',
                    message: message,
                    callback: function() {console.log('Undo Callback')}
                }
                $scope.toasts.push(toast);
            };

            $scope.addUndo = function(message, callback) {
                var toast = {
                    type: 'undo',
                    message: message,
                    callback: callback,
                    timer: 4000
                }
                $scope.toasts.push(toast);

                if(!$scope.hadUndoTimer) {
                    $scope.hadUndoTimer = true;
                    $timeout(undoTimeout, 100);
                }
            };

            var undoTimeout = function() {
                var hasUndo = false;

                for(var i=0; i<$scope.toasts.length; i++) {
                    if($scope.toasts[i].type == 'undo') {
                        hasUndo = true;
                        if($scope.toasts[i].timer <= 0) {
                            $scope.removeToast(i);
                        } else {
                            $scope.toasts[i].timer -= 100;
                        }
                    }
                }

                if(hasUndo) {
                    $timeout(undoTimeout, 100);
                } else {
                    $scope.hadUndoTimer = false;
                }
            };

            $scope.api = {
                addMessage: function(message) {
                    $scope.addMessage(message);
                },

                addError: function(message) {
                    $scope.addError(message);
                },

                addWarning: function(message) {
                    $scope.addWarning(message);
                },

                addUndo: function(message, callback) {
                    $scope.addUndo(message, callback);
                },
            }
        }
    }
}]);
