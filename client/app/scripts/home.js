(function() {
    
    var app = angular.module('myApp');
  
    app.controller('homeCtrl', ["$scope", '$http', "$location", "socket",
        function ($scope, $http, $location, socket) {
            var vm = this;
            
            vm.loading = true;
            vm.searchStock = "";
            vm.message = "";
            vm.stocks = [];
            
            var renderStocks = function(data) {
                
                var all = vm.stocks.map(s => s._id).join("+");
                
                $http.get("/api/stock/" + all).then(function(resp){
                        
                    new Highcharts.StockChart({
                        chart: { renderTo: 'chart' },
                        rangeSelector: { selected: 2 },
                        series: resp.data
                    });
                        
                }, handleError);
            }
            
            $scope.$on('socket:stocks', function (ev, data) {
                console.log("Stock update from socket");
                vm.stocks = data;
            });
            
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
            
            $http.get("/api/stock").then(function(resp){
                // success
                vm.loading = false;
                vm.stocks = resp.data;
                renderStocks();
                
            }, handleError);
        }
    ]);
  
}());
