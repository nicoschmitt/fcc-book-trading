(function() {
    
    var app = angular.module('myApp');
  
    app.controller('meCtrl', ["$scope", '$http', "$location", "adalAuthenticationService",
        function ($scope, $http, $location, adal) {
            var vm = this;
            
            vm.loading = true;
            vm.message = "";
            vm.user = { 
                email: adal.userInfo.profile.email, 
                name: adal.userInfo.profile.name, 
                country: "", 
                city: "" 
            };

            $http.post("/api/user/", vm.user).then(function(resp){
                // success
                vm.loading = false;
                vm.user = resp.data;
                vm.user.email = vm.user._id;       
                     
            }, handleError);
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            vm.update = function() {
                vm.loading = true;
                $http.post("/api/user/" + vm.user.email, vm.user).then(function(resp){
                    // success
                    vm.loading = false;
                    vm.user = resp.data;
                    vm.user.email = vm.user._id;       
                        
                }, handleError);
            };
            
        }
    ]);
  
}());
