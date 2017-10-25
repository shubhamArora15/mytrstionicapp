angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, $state, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.host = "http://192.168.0.102:3000"

  $scope.next = function(nextState){
      console.log(nextState);
      $state.go(nextState);
  }

  $scope.login = function(data){
      if(data.userType == "user"){
        $rootScope.rootAdmin = false;
        $state.go('app.home');
      }else{
        $rootScope.rootAdmin = true;
        $state.go('app.adminDashboard');
      }
  }

  $scope.createHierarchy1 = function(level){
    var obj = {
      level:level
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l1"})
      .then(function(response){
        JSON.stringfy(localStorage.setItem("l1", response.data[0]._id))
    });
  }
  $scope.createHierarchy2 = function(level){
    var obj = {
      level:level,
      level1:JSON.parse(localStorage.getItem('l1'))
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l2"})
      .then(function(response){
        JSON.stringfy(localStorage.setItem("l2", response.data[0]._id))
    });
  }
  $scope.createHierarchy3 = function(level){
    var obj = {
      level:level,
      level1:JSON.parse(localStorage.getItem('l1')),
      level2:JSON.parse(localStorage.getItem('l2'))
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l3"})
      .then(function(response){
        $state.go("app.viewHierarchy");
    });
  }



})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
