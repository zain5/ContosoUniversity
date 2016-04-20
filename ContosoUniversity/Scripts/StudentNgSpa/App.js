(function () {
    var app = angular.module("studentApp", ["ngRoute"]);
    
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "/Scripts/StudentNgSpa/main.html",
                controller: "MainController"
            })
            .when("/create", {
                templateUrl: "/Scripts/StudentNgSpa/create.html",
                controller: "CreateController"
            })
            .when("/edit/:studentId", {
                templateUrl: "/Scripts/StudentNgSpa/edit.html",
                controller: "EditController"
            })
            .otherwise({ redirectTo: "/main" });
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
        
            //.when("/Student/IndexNgSPA", {
            //    templateUrl: "/Scripts/StudentNgSpa/main.html",
            //    controller: "MainController"
            //})
            //.otherwise({ redirectTo: "/Student/IndexNgSPA" });
        //$locationProvider.html5Mode({enabled: true, requireBase: false});
    });
})();