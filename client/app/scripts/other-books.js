(function() {
    
    var app = angular.module('myApp');
  
    app.controller('otherBooksCtrl', ["$scope", '$http', 
        function ($scope, $http) {
            var vm = this;
            
            vm.loading = true;
            vm.message = "";
            vm.books = [];
            
            var handleError = function(resp) {
                vm.loading = false;
                vm.message = resp.data;
                console.log(resp.data);
            };
            
            vm.askTrade = function(book) {
                console.log("Ask for trade on " + book._id);
                $http.post("/api/trade/" + book._id).then(function(resp) {
                    $.snackbar({ content: "Request sent." });
                    
                }, handleError);
            };
            
            $http.get("/api/book/other").then(function(resp) {
                vm.loading = false;
                vm.books = resp.data;
                
            }, handleError);
        }
    ]);
  
}());
