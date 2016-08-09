(function() {
  'use strict';
  var module = angular.module("Dashboard", []);

  function barGraphController($scope, $window) {
    var $ctrl = this;

  //  $ctrl.color = "#A62E5C";
  //  $ctrl.width = 100;
  //  $ctrl.height = 50;
    $ctrl.specs ={height:30,padding:5,fontStyle:'10pt arial',
      fontHeight:10,
      gradientInterval: 50,
      gradients: [],
      bars: [
        {color: '#2A9FBC', width: 50, text:"September"},
        {color: '#F15B2A', width: 60, text:"October"},
        {color: '#A62E5C', width: 90, text:"November"}
      ]};

    $scope.$watch('$ctrl.specs', function() {

      var ctx = document.createElement('canvas').getContext('2d');
      $ctrl.specs.maxWidth = 0;
      $ctrl.specs.labelWidth = 0;
      var gradients = [];

      ctx.font = $ctrl.specs.fontStyle;

      angular.forEach($ctrl.specs.bars, function(bar,index) {
        $ctrl.specs.labelWidth = Math.max($ctrl.specs.labelWidth,
                                          ctx.measureText(bar.text).width);
        $ctrl.specs.maxWidth = Math.max($ctrl.specs.maxWidth,bar.width);
      });

      for (var i = 0;; i+= $ctrl.specs.gradientInterval) {
        gradients.push({text: i, offset: i});
        if( i > $ctrl.specs.maxWidth) {
          break;
        }
      }

      $ctrl.specs.labelWidth += 5;
      $ctrl.specs.gradients = gradients;
      $ctrl.specs.overallHeight = $ctrl.specs.bars.length *
        (1 * $ctrl.specs.height + $ctrl.specs.padding);

    }, true)



  };

  module.component("dashboard", {
    templateUrl: "components/Dashboard.html",
    controller: ["$scope","$window",barGraphController]
  });
}());
