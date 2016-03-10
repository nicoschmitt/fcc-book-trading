(function() {
    
    var app = angular.module('myApp');
  
    app.controller('addBookCtrl', ["$scope", '$http', "$location", "adalAuthenticationService",
        function ($scope, $http, $location, adal) {
            var vm = this;
            
            vm.loading = false;
            vm.searchBook = "";
            vm.message = "";
            vm.books = [];
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
           vm.search = function() {
                vm.message = "";
                vm.books = [];
                vm.loading = true;
                $http.get("/api/search/" + vm.searchBook).then(function(resp) {
                    // Success
                    vm.loading = false;
                    vm.books = resp.data;
                    
                }, handleError);  
            };
            
            vm.add = function(book) {
                
            };
        }
    ]);
  
}());
