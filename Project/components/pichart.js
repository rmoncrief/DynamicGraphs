(function() {
  'use strict';
  var module = angular.module("Dashboard");

  function pichartController($window, $scope) {
    var $ctrl = this;
    //var radians = 72 * (Math.PI/180);
    var x1 = 200, y1 = 0, total = 0, prevEndingAngle = 0;

    $ctrl.specs = {slices: [
      {value: 50 , color:"#A62E5C", label: {text: "North"} },
      {value: 100, color:"#9BC850", label: {text: "South"} },
      {value: 75 , color:"#F15B2A", label: {text: "East"} },
      {value: 50 , color:"#675BA7", label: {text: "West"} }
    ] };

    angular.forEach($ctrl.specs.slices, function(slice, i) {
      total += parseInt(slice.value);
    });

    angular.forEach($ctrl.specs.slices, function(slice, i) {
      slice.x1 = x1;
      slice.y1 = y1;
      slice.endingAngle = (slice.value/total *360) + prevEndingAngle;
      var radians = slice.endingAngle * (Math.PI/180);
      slice.x2 = (Math.cos(radians) * 200);
      slice.y2 = (Math.sin(radians) * 200);

      x1 = slice.x2;
      y1 = slice.y2;
      prevEndingAngle = slice.endingAngle;
    });

    angular.forEach($ctrl.specs.slices, function(slice,i) {
      var angle = i == 0 ? slice.endingAngle/2 : slice.endingAngle - (slice.endingAngle - prevEndingAngle)/2;
      var radians = angle * (Math.PI/180);
      var ticMarkX = Math.cos(radians) * 200;
      var ticMarkY = Math.sin(radians) * 200;

      slice.label.x = Math.cos(radians) * (200+20);
      slice.label.y = Math.sin(radians) * (200+20);
      slice.label.allignment = getAllignment(angle);
      slice.ticMark = { x: parseInt(ticMarkX), y:parseInt(ticMarkY), rotation: parseInt(angle)};
      prevEndingAngle = slice.endingAngle;
    });

    function getAllignment(s) {
      if(s < 45) return "start";
      else if (s <135) return "middle";
      else if (s <225) return "end";
      else if (s <315) return "middle";
      else return "start";
    }

  }//end of controller

  module.component("pichart", {
    controller: ["$window","$scope",pichartController],
    templateUrl: "/components/pichart.html"
  })
}());
