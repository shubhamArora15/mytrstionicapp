// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova', 'slick', 'btford.socket-io', 'ui.sortable', 'ksSwiper'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.factory('socket', function (socketFactory) {

  // var myIoSocket = io.connect('http://basicapp.arorashubham.com');
  var myIoSocket = io.connect('http://192.168.0.109:3000');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
}).directive('dynamicUrl', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attr) {
            element.attr('src', attr.dynamicUrlSrc);
        }
    };
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

  .state('app.createSession', {
    url: '/createSession',
    views: {
      'menuContent': {
        templateUrl: 'templates/createSession.html'
      }
    }
  })
  .state('app.viewMedia', {
    url: '/viewMedia',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewMedia.html'
      }
    }
  })
  .state('app.viewSession', {
      url: '/viewSession',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewSession.html'
        }
      }
    }).state('app.slideShow', {
        url: '/slideShow',
        views: {
          'menuContent': {
            templateUrl: 'templates/slideShow.html'
          }
        }
      })
    .state('app.scannedSessions', {
      url: '/scannedSessions',
      views: {
        'menuContent': {
          templateUrl: 'templates/scannedSessions.html'
        }
      }
    })
    .state('app.viewSessionDetails', {
      url: '/viewSessionDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewSessionDetails.html'
        }
      }
    })
    .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      }).state('app.createHierarchy1', {
        url: '/createHierarchy1',
        views: {
          'menuContent': {
            templateUrl: 'templates/createHierarchy1.html'
          }
        }
      }).state('app.createHierarchy2', {
        url: '/createHierarchy2',
        views: {
          'menuContent': {
            templateUrl: 'templates/createHierarchy2.html'
          }
        }
      }).state('app.createHierarchy3', {
        url: '/createHierarchy3',
        views: {
          'menuContent': {
            templateUrl: 'templates/createHierarchy3.html'
          }
        }
      }).state('app.viewHierarchy', {
        url: '/viewHierarchy',
        views: {
          'menuContent': {
            templateUrl: 'templates/viewHierarchy.html'
          }
        }
      }).state('app.levelOne', {
        url: '/levelOne',
        views: {
          'menuContent': {
            templateUrl: 'templates/levelOne.html'
          }
        }
      }).state('app.levelTwo', {
        url: '/levelTwo',
        views: {
          'menuContent': {
            templateUrl: 'templates/levelTwo.html'
          }
        }
      }).state('app.levelThree', {
        url: '/levelThree',
        views: {
          'menuContent': {
            templateUrl: 'templates/levelThree.html'
          }
        }
      }).state('app.viewHierarchyDetails', {
        url: '/viewHierarchyDetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/viewHierarchyDetails.html'
          }
        }
      }).state('app.updateHierarchy', {
        url: '/updateHierarchy',
        views: {
          'menuContent': {
            templateUrl: 'templates/updateHierarchy.html'
          }
        }
      }).state('app.adminDashboard', {
        url: '/adminDashboard',
        views: {
          'menuContent': {
            templateUrl: 'templates/adminDashboard.html'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AppCtrl'
      })
      .state('verify', {
        url: '/verify',
        templateUrl: 'templates/verify.html',
        controller: 'verifyCtrl'
      })
      .state('reset', {
        url: '/reset',
        templateUrl: 'templates/reset.html',
        controller: 'AppCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'AppCtrl'
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
