(function() {
	var MainController = function($scope, $http) {
		var getCourses = function() {
			$http.get("/api/CourseWeb").then(onGetCourses, onError);
		};

		var onGetCourses = function(response) {
			$scope.courses = response.data;
		};

		var onError = function() {
			$scope.error = "Could not fetch data. Server might be down.";
		};

		getCourses();
	};

	angular.module("courseApp").controller("MainController", MainController);
})();