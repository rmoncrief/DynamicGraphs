(function() {
  'use strict';
  var module = angular.module("Dashboard", []);

  function barGraphController($scope, $window) {
    var $ctrl = this;

  //  $ctrl.color = "#A62E5C";
  //  $ctrl.width = 100;
    $ctrl.height = 30;
    $ctrl.specs =
      [
        {color: '#2A9FBC', width: 50},
        {color: '#F15B2A', width: 60},
        {color: '#A62E5C', width: 70}
      ];
      
    $scope.$watch('specs', function() {
      $window.alert("stuff was changed")
    }, true)



  };

  module.component("dashboard", {
    templateUrl: "components/Dashboard.html",
    controller: ["$scope","$window",barGraphController]
  });
}());
