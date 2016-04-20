(function() {
    var CreateController = function($scope, $http, $location, $q) {

        var courseSelection = [];
        var newStudent = null;
        var enrollmentPromises = [];
        $scope.testMsg = "Let's create some Stuff here!!!";

        $scope.createStudent = function() {
            $scope.enrollDate = moment($scope.enrollDateDisplay, "MM/DD/YYYY").toDate();
            $scope.testMsg = $scope.firstName + $scope.lastName + " will be created successfully on " + $scope.enrollDateDisplay;

            $http
                .post("/api/StudentWeb", {
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName,
                    EnrollmentDate: $scope.enrollDate
                })
                .then(onStudentCreationSuccess, onError);
        };

        var onStudentCreationSuccess = function(response) {
            newStudent = response.data;

            if (newStudent) {
                createEnrollments(newStudent.StudentID);
            }
            
        };

        var createEnrollments = function(studentId) {
            courseSelection.forEach(function(courseId) {
                enrollmentPromises.push($http
                    .post("/api/EnrollmentWeb", {
                        CourseID: courseId,
                        StudentID: studentId
                    })
                    .then(onEnrollmentCreationSuccess, onError));
            });

            $q.all(enrollmentPromises).then(function() { 
                $location.path("/main"); 
            });
        };

        var onEnrollmentCreationSuccess = function(response) {

        };

        var onError = function(response) {
            $scope.error = "Could not fetch data. Server might be down.";
        };

        var getCourses = function() {
            $http.get("/api/CourseWeb").then(onGetCourses, onError);
        }

        var onGetCourses = function(response) {
            $scope.courses = response.data;
        }

        $scope.updateSelection = function(courseId) {
            var idx = courseSelection.indexOf(courseId);

            // currently selected, and to be removed
            if (idx > -1) {
                courseSelection.splice(idx, 1);
            }
            // add item to selection
            else {
                courseSelection.push(courseId);
            }
        };

        getCourses();
        $scope.firstName = "Hello";
        $scope.lastName = "World";
        $scope.enrollDate = new Date();
        $scope.enrollDateDisplay = moment($scope.enrollDate).format('MM/DD/YYYY');
    };

    angular.module("studentApp").controller("CreateController", CreateController);
})();
