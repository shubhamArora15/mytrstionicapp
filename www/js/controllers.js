angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $stateParams, $cordovaBarcodeScanner, $ionicPopup, $ionicModal, $timeout, $state, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $rootScope.levelRoot = "Select Level 1"
  $rootScope.levelMain = "Select Level 2"
  $rootScope.levelSub = "Select Level 3"
  $rootScope.allLevel = {}
  $scope.levelData = {
    level1:""
  };
  $scope.level2 = {
    name:""
  }
  $scope.level3 = {
    name:""
  }

  $scope.host = "http://192.168.0.115:3000"

  $scope.viewMedia = function(list){
    $scope.mediaList = list
    $state.go('app.viewMedia')
  }

  $scope.findNextLevel =  function(levelId, levelType){
    console.log(levelId, levelType);
    if(levelType == "second"){
      $http.post($scope.host + '/createHierarchy', {id:levelId, findSecond:true})
        .then(function(response){
          $rootScope.levelSecondId = response.data[0];
          // $rootScope.levelSecondList = response.data;
          console.log(response.data)
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

  // $scope.updateThis = function(){
  //   $scope.
  // }

  $scope.next = function(nextState){
      $state.go(nextState);
  }

  function checkLoginType(){
    if(localStorage.getItem('rootLogin') == "true"){
      $rootScope.rootAdmin = true;
    }else if(localStorage.getItem('userLogin') == "true"){
      $rootScope.rootAdmin = false;
    }
  }
  checkLoginType();

  $scope.login = function(data){

      $http.post($scope.host + '/users', {login:true, loginData:data})
        .then(function(response){
          if(response.data == "fail"){
            alert("already login");
          }else{
            localStorage.setItem("id", response.data[0]._id);

            console.log(response)
            if(data.userType == "user"){
              localStorage.setItem("userLogin", true);
              checkLoginType();
              $state.go('app.home');
            }else{
              localStorage.setItem("rootLogin", true);
              checkLoginType();
              $state.go('app.adminDashboard');
            }
          }
        })
  }

  $scope.signup = function(user){

    if(document.querySelector("#g-recaptcha-response")){
      var captcha = document.querySelector("#g-recaptcha-response").value;
    }else{
        var captcha = "notExists";
    }
    console.log(captcha);
    if(captcha == undefined || captcha == ""){
      alert("Please do google captcha verification");
    }else{
    $http.post($scope.host + "/users", {user:user,signup:true})
      .then(function(response){
          if(response.data == "already"){
            alert("You are already member");

          }else{
          alert("You email verification sent to: <br> "+ user.email);
          $http.post($scope.host + "/verify", {user:user,verifyEmail:true})
          .then(function(response){

          });
        }
      });
    }
  }

  /*
  ***
  UPDATE MEDIA ON SESSION CREATION
  */
  $scope.sortableOptions = {
   stop: function(e, ui) {
     // do something here
     console.log($scope.photos);
   }
  };

  /*
  ***
  UPDATE MEDIA ON SESSION VIEW
  */
  $scope.sortableOptions2 = {
   stop: function(e, ui) {
     // do something here
     console.log($scope.mediaList);
   }
  };


  $scope.hierarchyList = function(){
    $http.post($scope.host + '/createHierarchy', {getList:true})
      .then(function(response){
        console.log(response)
          $scope.hierarchyList = response.data;
      })
  }

  $scope.viewHierarchyDetails = function(list){
    console.log(list);
    $scope.levelName = list.name;
    $scope.levelId = list._id;
    $state.go('app.viewHierarchyDetails');
  }

  $scope.viewSessionDetails = function(list){
    console.log(list);
    $scope.sessionId = list._id;
    $scope.sessionName = list.session
    $scope.mediaList = list.photos;
    $scope.allLevels = [{
      name:list.allLevel.level1.name,
      id:list.allLevel.level1.id,
      index:'first'
    },{
      name:list.allLevel.level2.name,
      id:list.allLevel.level2.id,
      index:'second'
    },{
      name:list.allLevel.level3.name,
      id:list.allLevel.level3.id,
      index:'third'
    }]
    $state.go('app.viewSessionDetails');
  }

  $scope.createHierarchy1 = function(level){
    var obj = {
      level:level.name
    }
    $http.post($scope.host + "/createHierarchy",{obj,type:"l1"})
      .then(function(response){
        console.log(response)
        localStorage.setItem("l1", response.data._id);
        $state.go('app.adminDashboard');
    });
  }

  $scope.getLevelFirst = function(){
    $http.post($scope.host + "/createHierarchy",{getList:true})
      .then(function(response){
        $scope.levelFirst = response.data;
    });
  }
  $scope.createHierarchy2 = function(level, levelData){
    console.log(level, levelData)
    var obj = {
      level:level.name,
      level1:levelData.level1
    }
    console.log(obj);
    $http.post($scope.host + "/createHierarchy",{obj,type:"l2"})
      .then(function(response){
        localStorage.setItem("l2", response.data._id);
        $state.go('app.adminDashboard');
    });
  }

  $scope.getLevelSecond = function(id){
    console.log(id)
    $http.post($scope.host + "/createHierarchy",{getSecondList:true,id:id})
      .then(function(response){
        $scope.levelSecond = response.data;
    });
  }

  $scope.createHierarchy3 = function(level, levelData, levelData2){
    var obj = {
      level:level.name,
      level1:levelData.level1,
      level2:levelData2.level2
    }
    console.log(obj)
    // $http.post($scope.host + "/createHierarchy",{obj,type:"l3"})
    //   .then(function(response){
    //     $state.go("app.viewHierarchy");
    // });
  }

  $scope.getLevelThird = function(){
    $http.post($scope.host + "/createHierarchy",{getThird:true,
      id1:localStorage.getItem('l1'), id2:localStorage.getItem('l2')})
      .then(function(response){
        localStorage.setItem("l2", response.data._id);
        $state.go('app.createHierarchy3');
    });
  }

  $scope.updateHierarchy = function(id, level, type){
    console.log(level, type);
    $http.post($scope.host + "/createHierarchy",{id:id,value:level.name,type:type,updateList:true})
      .then(function(response){
        console.log(response);
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

  /*
  ***
  GET LEVEL
  */

  $scope.levelList = function(){
    $http.post($scope.host + '/createHierarchy', {getList:true})
      .then(function(response){
        console.log(response)
          $scope.rootList = response.data;
      })
  }


  /*
  ***
  GET  SECOND LEVEL
  */

  $scope.getSecondLevel = function(data){
    var data = JSON.parse(data);
    $http.post($scope.host + '/createHierarchy', {getSecondList:true, id:data._id})
      .then(function(response){
        console.log(response)

          $scope.secondRootList = response.data;
          var level1 = {
            name:data.name,
            id:data._id
          }
          $rootScope.allLevel['level1'] = level1;
      })
  }


  /*
  ***
  GET THIRD LEVEL
  */

  $scope.getThirdLevel = function(data){
    var data = JSON.parse(data);
    $http.post($scope.host + '/createHierarchy', {getThirdList:true,id:data._id})
      .then(function(response){
        console.log(response);
          // $rootScope.levelMain = data.name
          $scope.thirdRootList = response.data;

          var level2 = {
            name:data.name,
            id:data._id
          }

          $rootScope.allLevel['level2'] = level2;
      })
  }

  /*
  ***
  GET THIRD LEVEL
  */

  $scope.getFinalLevel = function(data){
    console.log(data);
    var data = JSON.parse(data);
      // $rootScope.levelSub = data.name;
      var level3 = {
        name:data.name,
        id:data._id
      }
      $rootScope.allLevel['level3'] = level3;
  }


  //////////
  // Upload Files

  $scope.photos = [];
  setTimeout(function () {
      a = document.getElementById("photo1");
      console.log(a);

    $(a).on("change", function(e){
      uploadFile("photo1");
    });
  }, 10);



  function uploadFile(id){
    var file    = document.getElementById(id).files[0];
    var fd = new FormData();
    console.log(file);
    var uploadUrl = $scope.host + '/saveImage';

    var newName = $scope.randomString(6)+ "."+$scope.split(file.name);

    fd.append('file', file, newName);
    // console.log(file);
    $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    })
    .then(function(response) {
      console.log(response)
        $scope.photos.push(newName);
        str = "You Uploaded:  <span style = 'font-size:18px'><b> "+$scope.photos.length +"</b></span>  File successfully";
        $("#showData").html(str);
    })
  }


  // SPLIT stringify

  $scope.split = function(value){
        value = value.split(".");
        ext = value[1];
        return ext;
  }


  /*
  ***
  CREATE SESSION
  */

  $scope.createSession = function(session, photos, allLevel){
    console.log(session, photos, allLevel);

    $http.post($scope.host + "/createSession", {session,photos,allLevel,userId:localStorage.getItem('id'), createSession:true})
      .then(function(response){
        console.log(response);
        $state.go("viewSession");
          // alert("You successfully reset your password");
      });
  }

  //view sessionArray
  $scope.viewSession = function(){
    $http.post($scope.host + "/createSession", {userId:localStorage.getItem('id'), viewSession:true})
      .then(function(response){
        console.log(response);
        if(response.data == "404"){
          alert("no Session create new one");
        }else{
          $scope.sessionList = response.data;
        }
          // alert("You successfully reset your password");
      });
  }


  $scope.logout = function(){
    localStorage.clear();
    $state.go('login');
  }


  $scope.randomString = function(len) {
    var text = "";
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }

  $scope.scanBarcode = function() {
       $cordovaBarcodeScanner.scan().then(function(imageData) {
          if(imageData==undefined || imageData.text == undefined || imageData.text == ""){

          }else{
             alert(imageData.text);
             $scope.imageText = imageData.text;
             var solution = $scope.splitQR(imageData.text);
             console.log(solution);

             $scope.sId = solution.sId;
             $scope.sCoreId = solution.sessionCoreId;
             $scope.userId = JSON.parse(localStorage.getItem('id'));

             console.log("Barcode Format -> " + imageData.format);

                 $http.post($scope.host + '/checkSession', {sessionId:imageData.text, checkSession:true})
                   .then(function(response){
                       console.log(response.data, "done");
                       socket.emit('sessionData', {
                          sessionId : $scope.sId,
                          sessionCoreId:$scope.sCoreId,
                          id: $scope.userId
                        });
                   });
             console.log("Cancelled -> " + imageData.cancelled);
           }
         }, function(error) {
             console.log("An error happened -> " + error);
         });
   };



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

.controller('verifyCtrl', function($scope, $http, $stateParams) {

});
