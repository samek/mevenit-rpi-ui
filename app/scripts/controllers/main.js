'use strict';

/**
 * @ngdoc function
 * @name mevenboxAngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mevenboxAngApp
 */

var mevenBoxControllers = angular.module('mevenBoxControllers', []);
var hostname="http://10.0.1.3:8000";
//var hostname='http://private-38c7f8-mevenbox.apiary-mock.com';
mevenBoxControllers.controller('MainCtrl', ['$scope', '$http','$interval','$window',
    function($scope, $http,$interval,$window) {

      $scope.online = null;
      $scope.status = null;

      activate();

      ////

      function activate() {
        getData();
        getStatus();
      }


      function reboot() {
        $http.get(hostname+'/api/device/reboot').success(ActionData);
      }

      function resetNetwork() {
        $http.get(hostname+'/api/device/resetnetwork').success(ActionData);
      }

      function updateDevice() {
        $http.get(hostname+'/api/status/online').success(ActionData);
      }

      function factoryReset() {
        $http.get(hostname+'/api/device/factoryreset').success(ActionData);
      }

      function update() {
        $http.get(hostname+'/api/device/update').success(ActionData);
      }

      function ActionData(data) {
        $scope.action = data.data;
        console.log('Action',$scope.action);
        $window.location.path="/#/loading";
      }


      function getData() {
        $http.get(hostname+'/api/status/online').success(dataLoaded);
      }

      function getStatus() {
        $http.get(hostname+'/api/status/').success(StatusDataLoaded);
      }

      function dataLoaded(data) {
        $scope.online = data.data.connected;
        console.log('Online',$scope.online);
      }

      function StatusDataLoaded(data) {
        $scope.status = data.data;
        console.log('Status',$scope.status);
      }




      $interval(function(){
        getData();
      }.bind(this), 5000);

    }
  ]
);






mevenBoxControllers.controller('FormWifiController', ['$scope', '$http','$interval','$location',
    function($scope, $http,$interval,$location) {

      $scope.master = {};

      $scope.update = function(wlan) {
        $scope.master = angular.copy(wlan);
        $scope.master.iface='wlan';
        console.log('mother fucker',wlan);
        $http.post('/someUrl', {msg:$scope.master}).success(dataPosted);

      };

      $scope.reset = function() {
        $scope.wlan = angular.copy($scope.master);
      };

      $scope.reset();

      function dataPosted(data) {
        //$scope.online = data.data.connected;
        console.log('POST DELA');
      }

    }
  ]
);


mevenBoxControllers.controller('FormEthController', ['$scope', '$http','$interval','$location',
    function($scope, $http,$interval,$location) {

      $scope.master = {};
      $scope.master.dhcp=1;

      $scope.update = function(eth) {
        $scope.master = angular.copy(eth);
        $scope.master.iface='eth';
        console.log('mother fucker',eth);
        $http.post('/someUrl', {msg:$scope.master}).success(dataPosted);

      };

      $scope.reset = function() {
        $scope.eth = angular.copy($scope.master);
      };

      $scope.reset();

      function dataPosted(data) {
        //$scope.online = data.data.connected;
        console.log('POST DELA');
      }

    }
  ]
);


mevenBoxControllers.controller('ConnectCtrl', ['$scope', '$http','$interval','$window',
    function($scope, $http,$interval,$window) {

      $scope.online = null;
      $scope.status = null;

      activate();

      ////

      function activate() {
        getData();

      }


      function getData() {
        $http.get(hostname+'/api/pair').success(dataLoaded);
      }


      function dataLoaded(data) {
        $scope.pair = data.data;
        if (data.data.status==1) {
          $window.location.href=data.data.slideshowUrl;
        }
        console.log('Pair',$scope.pair);
      }



      $interval(function(){
        getData();
      }.bind(this), 5000);

    }
  ]
);


mevenBoxControllers.controller('InfoCtrl', ['$scope', '$http','$interval','$window',
    function($scope, $http,$interval,$window) {


      $scope.info = null;

      activate();

      ////

      function activate() {
        getData();

      }


      function getData() {
        $http.get(hostname+'/api/settings').success(dataLoaded);
      }


      function dataLoaded(data) {
        $scope.info = data.data;

      }

    }
  ]
);
