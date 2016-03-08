(function() {
    
    var app = angular.module('myApp');
  
    app.controller('topNavCtrl', ["$scope", "$location", 
        function ($scope, $location, socket) {
            var vm = this;
            
            vm.isActive = function(viewLocation) { 
                return viewLocation === $location.path();
            };
        }
    ]);
  
    app.directive("topNav", function () {
        return {
            restrict: 'E',
            templateUrl: "/app/views/top-nav.html",
            controller: "topNavCtrl",
            controllerAs: "nav"
        };
    });
  
}());
