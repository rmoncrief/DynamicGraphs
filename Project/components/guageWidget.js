(function() {
  'use strict';
  var module = angular.module("Dashboard");

  function guageWidgetController($scope,$window) {
    var $ctrl = this;
    var startingPt;
    var endingPt;
    var gradients = [];

    $scope.$watch("$ctrl.percentage", function() {
      if($ctrl.percentage > 180) {
        $ctrl.percentage = 180;
      }
      $ctrl.value = getArcPathForAngle(0,$ctrl.percentage,200);
      //alert("the value has changed");
    },true);

    $ctrl.specs = {centerX: 300, centerY:300, radius: 200, maxValue: 180, graidentInterval: 10, gradients: []};
    $ctrl.percentage = 45;
    for (var value=0, offsets=0;
          value < $ctrl.specs.maxValue;
            value += $ctrl.specs.graidentInterval, offsets += 100/18) {
              gradients.push({value: value, offsets: offsets});
   }


    var getCoordinatesForAngle = function(centerX,centerY,radius,angleInDegrees) {
      var angleInRadians = (angleInDegrees-180) * Math.PI/180.0;

      return {
        x:parseInt(centerX + (radius * Math.cos(angleInRadians))),
        y:parseInt(centerY + (radius * Math.sin(angleInRadians)))
      }
    };// End of getCoordinatesForAngle


    var getArcPathForAngle = function(startingAngle, endingAngle,radius) {
      startingPt = getCoordinatesForAngle(300,300,radius,startingAngle);
      endingPt = getCoordinatesForAngle(300,300,radius,endingAngle);

      return ["M",startingPt.x,startingPt.y,"A",radius,radius,0,0,1,endingPt.x,endingPt.y].join(" ")
    }//end of getArcPathForAngle

    $ctrl.maxValueCoordinates = getCoordinatesForAngle(300,300,210,180);


    $ctrl.background = getArcPathForAngle(0,180,200);
    $ctrl.thin = getArcPathForAngle(0,180,210);
    $ctrl.specs.gradients = gradients;
  } //End of controller

  module.component("guageWidget", {
    templateUrl: "/components/guageWidget.html",
    controller: ["$scope","$window",guageWidgetController]
  })
}());
