(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ["$scope", '$http', "adalAuthenticationService",
        function ($scope, $http, adal) {
            var vm = this;
            
            vm.loading = true;
            vm.message = "";
            vm.books = [];
            vm.trades = [];
            
            vm.giveBack = function(book) {
                $http.put("/api/book/" + book._id, { action: "giveback" }).then(function(resp) {
                    for(var i = vm.trades.length - 1; i >= 0; i--) {
                        if (vm.trades[i]._id == book._id) vm.trades.splice(i, 1);
                    }
                    
                }, handleError);
            }
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            if (adal.userInfo.isAuthenticated) {
                $http.get("/api/book/my").then(function(resp) {
                    vm.loading = false;
                    vm.books = resp.data.my;
                    vm.trades = resp.data.trades;
                    
                }, handleError);
            }
        }
    ]);
  
}());
