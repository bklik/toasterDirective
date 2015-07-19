# toasterDirective

Control that messages can be sent to, and pops a temporary dismiss-able, or actionable notification to the user.

**Requirements**

* [AngularJS](http://angularjs.org/)
* [bklik/styleSheetFactory](https://github.com/bklik/styleSheetFactory)

### Installation

Link to popup's CSS and Javascript files.
```html
<script src="toasterDirective/toasterDirective.js"></script>
```

In your app's directives.js file, add the toasterDirective module.
```javascript
angular.module('myApp', ['toasterDirective']);
```

Last, simply add a `<toaster-directive>` element.
```html
<toaster-directive api="toaster01"></toaster-directive>
<button ng-click="toaster01.message('Test')">New Toast Message</button>
```