/* global angular */
(function() {
  var app = angular.module('myApp', [ 'ngRoute', "ngAnimate", "mgcrea.ngStrap", "btford.socket-io" ]);
  
  app.factory("socket", ["socketFactory", function (socketFactory) {
    console.log("socket factory");
    var socket = socketFactory();
    socket.forward('stocks');
    return socket;
  }]);
  
  app.config(['$routeProvider', 
    function ($routeProvider) {
   
      $routeProvider.when("/Home", {
        templateUrl: "/app/views/home.html",
        controller: "homeCtrl",
        controllerAs: "vm"

      }).otherwise({ redirectTo: "/Home" });
      
  }]);

  fetchData().then(launchApplication);

  function fetchData() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    return $http.get("/api/config").then(function(resp){
      //app.constant("adalAppId", resp.data.adalAppId);
    });
  };

  function launchApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["myApp"]);
    });
  };
  
  
  var socket = io();

}());
