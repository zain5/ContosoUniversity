(function() {
	var app = angular.module("universityApp", ["ngRoute"]);

	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when("/main", {
				templateUrl: "/Scripts/Spas/CourseSpa/main.html",
				controller: "MainController"
			})
			.otherwise({ redirectTo: "/main" });

			$locationProvider.html5Mode({ enabled: true, requireBase: true });
	});
})();