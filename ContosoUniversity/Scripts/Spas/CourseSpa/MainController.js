(function() {
	var MainController = function($scope, universityService) {
		var getCourses = function() {
			universityService.getCourses().then(onGetCourses, onError);
		};

		var onGetCourses = function(data) {
			$scope.courses = data;
		};

		var onError = function() {
			$scope.error = "Could not fetch data. Server might be down.";
		};

		getCourses();
	};

	angular.module("universityApp").controller("MainController", MainController);
})();