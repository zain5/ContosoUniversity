(function() {
    var app = angular.module("universityApp", ["ngRoute"]);

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "/Scripts/Spas/StudentSpa/main.html",
                controller: "MainController"
            })
            .when("/create", {
                templateUrl: "/Scripts/Spas/StudentSpa/create.html",
                controller: "CreateController"
            })
            .when("/edit/:studentId", {
                templateUrl: "/Scripts/Spas/StudentSpa/edit.html",
                controller: "EditController"
            })
            .otherwise({ redirectTo: "/main" });
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
    });
})();
