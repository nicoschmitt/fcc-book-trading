(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ["$scope", '$http', "$location", "adalAuthenticationService",
        function ($scope, $http, $location, adal) {
            var vm = this;
            
            vm.loading = true;
            vm.searchStock = "";
            vm.message = "";
            vm.stocks = [];
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            vm.addSymbol = function() {
                console.log("Add " + vm.searchStock);
                
                vm.message = "";
                $http.post("/api/stock/" + vm.searchStock).then(function(resp){
                   // success
                   vm.stocks.push(resp.data);
                   vm.searchStock = "";
                   renderStocks();
                   socket.emit("stocks");
                   
                }, handleError);
            };
            
            vm.delete = function(stock) {
                console.log("Remove " + stock._id);
                
                vm.message = "";
                $http.delete("/api/stock/" + stock._id).then(function(resp){
                   // success
                   vm.stocks = vm.stocks.filter(s => s._id != stock._id);
                   renderStocks();
                   socket.emit("stocks");
                   
                }, handleError);
            };

        }
    ]);
  
}());
