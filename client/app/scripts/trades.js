(function() {
    
    var app = angular.module('myApp');
  
    app.controller('tradesCtrl', ["$scope", '$http',
        function ($scope, $http) {
            var vm = this;
            
            vm.loading = true;
            vm.message = "";
            vm.inbox = [];
            vm.requests = [];
            
            vm.approve = function(trade) {
                $http.put("/api/trade/" + trade._id + "/approve").then(function(resp){
                    $.snackbar({ content: "Trade approved." });
                    
                    for(var i = vm.inbox.length - 1; i >= 0; i--) {
                        if (vm.inbox[i]._id == trade._id) vm.inbox.splice(i, 1);
                    }
                
                }, handleError);
            };
            
            vm.reject = function(trade) {
                $http.put("/api/trade/" + trade._id + "/reject").then(function(resp){
                    $.snackbar({ content: "Trade cancelled." });
                    
                    for(var i = vm.inbox.length - 1; i >= 0; i--) {
                        if (vm.inbox[i]._id == trade._id) vm.inbox.splice(i, 1);
                    }
                
                }, handleError);
            };
            
            vm.remove = function(trade) {
                $http.delete("/api/trade/" + trade._id).then(function(resp){
                    $.snackbar({ content: "Trade cancelled." });
                    
                    for(var i = vm.requests.length - 1; i >= 0; i--) {
                        if (vm.requests[i]._id == trade._id) vm.requests.splice(i, 1);
                    }
                
                }, handleError);
            };
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            $http.get("/api/trade").then(function(resp) {
                vm.loading = false;
                vm.inbox = resp.data.toMe.map(r => { r.when = moment(r.when).fromNow(); return r; });
                vm.requests = resp.data.byMe.map(r => { r.when = moment(r.when).fromNow(); return r; });
                
            }, handleError);
        }
    ]);
  
}());
