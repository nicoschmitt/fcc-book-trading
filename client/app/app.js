/* global angular */
(function() {
    $.material.init();
    
    var app = angular.module('myApp', [ 'ngRoute', "AdalAngular", "ngMaterial" ]);
  
    app.config(["adalAppId", '$routeProvider','$httpProvider', 'adalAuthenticationServiceProvider',
        function (adalAppId, $routeProvider, $httpProvider, adalProvider) {
   
            $routeProvider.when("/Home", {
                templateUrl: "/app/views/home.html",
                controller: "homeCtrl",
                controllerAs: "vm"

            }).when("/Me", {
                templateUrl: "/app/views/me.html",
                controller: "meCtrl",
                controllerAs: "vm",
                requireADLogin: true

            }).when("/Other", {
                templateUrl: "/app/views/other-books.html",
                controller: "otherBooksCtrl",
                controllerAs: "vm",
                requireADLogin: true
                
            }).when("/Add", {
                templateUrl: "/app/views/add-book.html",
                controller: "addBookCtrl",
                controllerAs: "vm",
                requireADLogin: true
                                
            }).when("/Trades", {
                templateUrl: "/app/views/trades.html",
                controller: "tradesCtrl",
                controllerAs: "vm",
                requireADLogin: true
                
            }).otherwise({ redirectTo: "/Home" });
        
            adalProvider.init({
                instance: 'https://login.microsoftonline.com/', 
                tenant: 'common',
                clientId: adalAppId
            }, $httpProvider );
          
   }]);

  fetchData().then(launchApplication);

  function fetchData() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    return $http.get("/api/config").then(function(resp){
      app.constant("adalAppId", resp.data.adalAppId);
    });
  };

  function launchApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["myApp"]);
    });
  };
  
}());
