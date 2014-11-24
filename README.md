# Angular Post Message API

Allow AngularJS to listen and publish cross-document messages though [`window.postMessage`](http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#crossDocumentMessages) API.

Cross-document messaging is compatible with the following browsers as seen on [Can I Use](http://caniuse.com/x-doc-messaging):

- Internet Explorer 8+
- Firefox 3+
- Chrome 4+
- Safari 4+
- Opera 9.5+
- iOS Safari 3.2+
- Opera Mini 5+
- Android Browser 2.1+
- Blackberry Browser 7+
- Opera Mobile 10+
- Chrome for Android 30+
- Firefox for Android 25+
- Internet Explorer Mobile 10+

*Partial support in IE8-9 refers to only working in frames/iframes (not other tabs/windows). Also in IE 9 and below an object cannot be sent using postMessage. Partial support in IE10 refers to [limitations in certain conditions](http://stackoverflow.com/questions/16226924/is-cross-origin-postmessage-broken-in-ie10)*

## Installation

Checkout this repo into your project.

Then include `angular-post-message.js` into your project.

## Usage

This is a simple example which uses postMessage to deliver messages between two origins. There is a [gist](https://gist.github.com/kylewelsby/585b3a5395c6731acc50) which will deliver a message every second. See live demo [here](http://jsbin.com/jenaq).

#### index.html

    <!DOCTYPE html>
    <html ng-app="app">
    <head>
        <script src="bower_components/angularjs/angular.js"></script>
        <script src="lib/angular-post-message/angular-post-message.js"></script>
    </head>
    <body ng-controller="MainCtrl">
        <iframe track="1" src="https://rawgit.com/kylewelsby/585b3a5395c6731acc50/raw/f661e856adbccf39549ed7c550661f09158f8d55/index.html"></iframe>
        <br>
        <button ng-click="sendMessage(1);">Send response</button>
        <br>
        <ol>
              <li ng-repeat="message in messages">{{message}}</li>
        </ol>
    </body>
    </html>

#### app.js

    var app = angular.module('app', ['ngPostMessage']);
    app.controller('MainCtrl', function($scope, postMessage) {
      $scope.messages = [];
    
      postMessage.frames = $scope.frames = {}; // prefer local mapper
      postMessage.recv(function(event, data){
        $scope.messages.push(angular.fromJson(data));
      });
      $scope.sendMessage = function(id) {
        postMessage.post(id, angular.toJson({"response":"hi"}));
      };
    });

## Credits

This project is based on [Kyle's work](https://github.com/kylewelsby/angular-post-message) with added support of multiple iframes and simplified API.

## License
MIT