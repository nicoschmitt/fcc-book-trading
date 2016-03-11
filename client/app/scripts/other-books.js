(function() {
    
    var app = angular.module('myApp');
  
    app.controller('otherBooksCtrl', ["$scope", '$http', "$location", "adalAuthenticationService",
        function ($scope, $http, $location, adal) {
            var vm = this;
            
            vm.loading = true;
            vm.message = "";
            vm.books = [];
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            if (adal.userInfo.isAuthenticated) {
                $http.get("/api/book/other").then(function(resp) {
                    vm.loading = false;
                    vm.books = resp.data;
                    
                }, handleError);
            }
        }
    ]);
  
}());
