/***********************************************************************
 * Toaster Directive
 * Author: Brenton Klik
 * 
 * Prerequisites:
 *  - AngularJS
 *  - styleSheetFactory (https://github.com/bklik/styleSheetFactory)
 * 
 * Description:
 * TODO
/**********************************************************************/
angular.module('toasterDirective', ['styleSheetFactory'])

.directive('toasterDirective', ['styleSheetFactory', function(styleSheetFactory) {
    return {
        scope: {
            api: '=',
        },
        restrict: 'E',
        link: function($scope, $element, $attrs) {
            
        }
    }
}]);
