// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova', 'btford.socket-io'])

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

.factory('socket',function (socketFactory) {
  var myIoSocket = io.connect('http://basicapp.arorashubham.com');
  // var myIoSocket = io.connect('http://192.168.0.115:3000');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
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
  .state('app.viewSession', {
      url: '/viewSession',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewSession.html'
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
      }).state('app.createHierarchy', {
        url: '/createHierarchy',
        views: {
          'menuContent': {
            templateUrl: 'templates/createHierarchy.html'
          }
        }
      }).state('app.viewHierarchy', {
        url: '/viewHierarchy',
        views: {
          'menuContent': {
            templateUrl: 'templates/viewHierarchy.html'
          }
        }
      }).state('app.updateHierarchy', {
        url: '/updateHierarchy',
        views: {
          'menuContent': {
            templateUrl: 'templates/updateHierarchy.html'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
      })
      .state('reset', {
        url: '/reset',
        templateUrl: 'templates/reset.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html'
      })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
