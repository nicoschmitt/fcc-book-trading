(function() {
    
    var app = angular.module('myApp');
  
    app.controller('topNavCtrl', ["$scope", "$location", 'adalAuthenticationService', "$http", 
        function ($scope, $location, adal, $http) {
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
            
            $scope.$on("adal:loginSuccess", function() {
                console.log("login");
                console.log(adal.userInfo);
                $http.post("/api/user/", adal.userInfo).then(function(resp){
                   // success
                   
                   
                });
            });
            
            $scope.$on("adal:loginFailure", function() {
                console.log("login failure");
            });
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
