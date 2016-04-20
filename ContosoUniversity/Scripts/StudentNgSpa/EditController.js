(function() {
    var EditController = function($scope, $http, $location, $routeParams) {

        $scope.titleMsg = "Edit the Student";
        
        var getStudent = function(studentId) {
            $http.get("/api/StudentWeb/" + studentId).then(onGetStudent, onError);
        };
        
        var onGetStudent = function (response) {
            $scope.student = response.data;
            if ($scope.student)
            {
                $scope.student.EnrollmentDateDisplay = moment($scope.student.EnrollmentDate).format('MM/DD/YYYY');
            }
            getCourses();
        };
        
        var getCourses = function () {
            $http.get("/api/CourseWeb").then(onGetCourses, onError);
        }
        
        var onGetCourses = function (response) {
            $scope.courses = response.data;
        }

        var onError = function(response) {
            $scope.error = "Could not fetch data. Server might be down.";
        };
        
        $scope.isCourseInSelection = function(courseId) {
          return $scope.student.Courses.findIndex(function(element) { return element.CourseID === courseId; }) > -1;
        };
        
        $scope.editStudent = function() {
          $scope.titleMsg = "Student will be edited later!";
        };
        
        getStudent($routeParams.studentId);
    };

    angular.module("studentApp").controller("EditController", EditController);
})();