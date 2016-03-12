(function() {
    
    var app = angular.module('myApp');
  
    app.controller('meCtrl', ["$scope", '$http', "adalAuthenticationService",
        function ($scope, $http, adal) {
            var vm = this;
            
            vm.loading = true;
            vm.message = "";
            vm.user = { 
                email: adal.userInfo.profile.email, 
                name: adal.userInfo.profile.name, 
                country: "", 
                city: "" 
            };
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            vm.update = function() {
                console.log(vm.user);
                vm.loading = true;
                $http.post("/api/user/" + vm.user.email, vm.user).then(function(resp){
                    // success
                    vm.loading = false;
                    vm.user = resp.data;
                    vm.user.email = vm.user._id;
                        
                }, handleError);
            };
            
            $http.post("/api/user/", vm.user).then(function(resp){
                // success
                vm.loading = false;
                vm.user = resp.data;
                vm.user.email = vm.user._id;
                     
            }, handleError);
        }
    ]);
  
}());
