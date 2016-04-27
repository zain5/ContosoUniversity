(function() {
    var CreateController = function($scope, $location, $q, universityService) {

        var courseSelection = [];
        var newStudent = null;
        var enrollmentPromises = [];
        $scope.testMsg = "Let's create some Stuff here!!!";

        $scope.createStudent = function() {
            $scope.enrollDate = moment($scope.enrollDateDisplay, "MM/DD/YYYY").toDate();
            $scope.testMsg = $scope.firstName + $scope.lastName + " will be created successfully on " + $scope.enrollDateDisplay;

            universityService
                .createStudent($scope.firstName, $scope.lastName, $scope.enrollDate)
                .then(onStudentCreationSuccess, onError);
        };

        var onStudentCreationSuccess = function(data) {
            newStudent = data;

            if (newStudent) {
                createEnrollments(newStudent.StudentID);
            }

        };

        var createEnrollments = function(studentId) {
            courseSelection.forEach(function(courseId) {

                enrollmentPromises.push(
                    universityService
                    .addEnrollment(courseId, studentId)
                    .then(null, onError)
                );
            });

            $q.all(enrollmentPromises).then(function() {
                $location.path("/main");
            });
        };

        var onError = function(response) {
            $scope.error = "Could not fetch data. Server might be down.";
        };

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

        universityService.getCourses().then((data) => { $scope.courses = data; }, onError);
        $scope.firstName = "Hello";
        $scope.lastName = "World";
        $scope.enrollDate = new Date();
        $scope.enrollDateDisplay = moment($scope.enrollDate).format('MM/DD/YYYY');
    };

    angular.module("universityApp").controller("CreateController", CreateController);
})();
