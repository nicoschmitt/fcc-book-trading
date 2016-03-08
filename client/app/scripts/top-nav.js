(function() {
    
    var app = angular.module('myApp');
  
    app.controller('topNavCtrl', ["$scope", "$location", 'adalAuthenticationService',
        function ($scope, $location, adal) {
            var vm = this;
            
            vm.login = function() {
                adal.login();
            };
            
            vm.logout = function() {
                adal.logout();
            };
            
            vm.getUsername = function() {
                var auth = adal.userInfo.isAuthenticated;
                return (auth && adal.userInfo.profile.name) || "";
            };
            
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
