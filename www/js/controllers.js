angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http,$stateParams, $ionicModal, $timeout, $state, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  console.log($rootScope.levelId)

  if($rootScope.levelId!=undefined){
    $scope.level = {
      name:$rootScope.levelName
    }
  }

  $scope.findNextLevel =  function(levelId, levelType){
    console.log(levelId, levelType);
    if(levelType == "second"){
      $http.post($scope.host + '/createHierarchy', {id:levelId, findSecond:true})
        .then(function(response){
          $rootScope.levelSecondId = response.data[0]._id;
          $rootScope.level2 = {
            name:response.data[0].name
          }
          $state.go('app.createHierarchy2');

      });
    }else if(levelType == "third"){
      $http.post($scope.host + '/createHierarchy', {id:levelId, findThird:true})
        .then(function(response){

            $rootScope.levelThirdId = response.data[0]._id;
            $rootScope.level3 = {
              name:response.data[0].name
            }
            $state.go('app.createHierarchy3');
      });
    }else{
      $http.post($scope.host + '/createHierarchy', {id:levelId, findFirst:true})
        .then(function(response){
          console.log(response)
            $rootScope.levelFirstId = response.data[0]._id;
            $rootScope.level = {
              name:response.data[0].name
            }
            $state.go('app.createHierarchy1');
      });
    }
  }

  $scope.host = "http://192.168.0.115:3000"

  $scope.next = function(nextState){
      $state.go(nextState);
  }

  function checkLoginType(){
    if(localStorage.getItem('rootLogin') == "true"){
      $rootScope.rootAdmin = true;
    }else{
      $rootScope.rootAdmin = false;
    }
  }
  checkLoginType();

  $scope.login = function(data){
      if(data.userType == "user"){
        localStorage.setItem("userLogin", true);
        checkLoginType();
        $state.go('app.home');
      }else{
        localStorage.setItem("rootLogin", true);
        checkLoginType();
        $state.go('app.adminDashboard');
      }

      $http.post($scope.host + '/users', {login:true, loginData:data})
        .then(function(response){
          console.log(response)
            $scope.hierarchyList = response.data;
        })
  }

  $scope.signup = function(data){

      $http.post($scope.host + '/users', {login:true,signupData:data})
        .then(function(response){
          console.log(response);
        })
  }

  $scope.hierarchyList = function(){
    $http.post($scope.host + '/createHierarchy', {getList:true})
      .then(function(response){
        console.log(response)
          $scope.hierarchyList = response.data;
      })
  }

  $scope.createHierarchy1 = function(level){
    var obj = {
      level:level.name
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l1"})
      .then(function(response){
        console.log(response)
        localStorage.setItem("l1", response.data._id);
        $state.go('app.createHierarchy2');
    });
  }
  $scope.createHierarchy2 = function(level){
    var obj = {
      level:level.name,
      level1:localStorage.getItem('l1')
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l2"})
      .then(function(response){
        localStorage.setItem("l2", response.data._id);
        $state.go('app.createHierarchy3');
    });
  }
  $scope.createHierarchy3 = function(level){
    var obj = {
      level:level.name,
      level1:localStorage.getItem('l1'),
      level2:localStorage.getItem('l2')
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l3"})
      .then(function(response){
        $state.go("app.viewHierarchy");
    });
  }

  $scope.updateHierarchy = function(id, level, type){
    $http.post($scope.host + "/createHierarchy",{id:id,value:level,type:type,updateList:true})
      .then(function(response){
        alert("done");
    });
  }

  $scope.deleteList = function(req){
    $http.post($scope.host + "/createHierarchy",{id:req._id,deleteList:true})
      .then(function(response){
        alert('delete');
        $state.reload();
    });
  }

  $scope.logout = function(){
    localStorage.clear();
    $state.go('login');
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
