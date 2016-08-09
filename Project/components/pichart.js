(function() {
  'use strict';
  var module = angular.module("Dashboard");

  function pichartController($window, $scope) {
    var $ctrl = this;

  }

  module.component("pichart", {
    controller: ["$window","$scope",pichartController],
    templateUrl: "/components/pichart.html"
  })
}());
