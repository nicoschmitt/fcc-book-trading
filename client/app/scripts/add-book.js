(function() {
    
    var app = angular.module('myApp');
  
    app.controller('addBookCtrl', ["$scope", '$http', 
        function ($scope, $http) {
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
                console.log("Add book " + book.googleid);
                $http.post("/api/book/" + book.googleid, book).then(function(resp){
                    $.snackbar({ content: "Book added." });
                    
                }, handleError);
            };
        }
    ]);
  
}());
