(function() {
    var EditController = function($scope, $http, $location, $routeParams, $q) {

        var courseSelectionOrig = []
        var courseSelection = [];
        var newStudent = null;
        var enrollmentPromises = [];
        $scope.titleMsg = "Edit the Student";

        var getStudent = function(studentId) {
            $http.get("/api/StudentWeb/" + studentId).then(onGetStudent, onError);
        };

        var onGetStudent = function(response) {
            $scope.student = response.data;
            if ($scope.student) {
                $scope.student.EnrollmentDateDisplay = moment($scope.student.EnrollmentDate).format('MM/DD/YYYY');
                $scope.student.Courses.forEach(T => { courseSelectionOrig.push(T.CourseID); });
                courseSelection = courseSelectionOrig.slice();
            }
            getCourses();
        };

        var getCourses = function() {
            $http.get("/api/CourseWeb").then(onGetCourses, onError);
        }

        var onGetCourses = function(response) {
            $scope.courses = response.data;
        }

        var onError = function(response) {
            $scope.error = "Could not fetch data. Server might be down.";
        };

        $scope.isCourseInSelection = function(courseId) {
            return courseSelection.indexOf(courseId) > -1;
        };

        $scope.updateSelection = function(courseId) {
            var idx = courseSelection.indexOf(courseId);

            if (idx > -1) {
                courseSelection.splice(idx, 1);
            } else {
                courseSelection.push(courseId);
            }
        };

        $scope.editStudent = function() {
            $scope.student.EnrollmentDate = moment($scope.student.EnrollmentDateDisplay, "MM/DD/YYYY").toDate();

            // First PUT the student
            enrollmentPromises.push($http
                .put("/api/StudentWeb/" + $scope.student.StudentID, {
                    StudentID: $scope.student.StudentID,
                    FirstName: $scope.student.FirstName,
                    LastName: $scope.student.LastName,
                    EnrollmentDate: $scope.student.EnrollmentDate
                })
                .then(null, onError));

            // Run through the course Ids and update the enrollments
            $scope.courses.forEach(course => {
                // Add Enrollment if selected and doesn't exist in orig selection
                if (courseSelection.indexOf(course.CourseID) > -1 && courseSelectionOrig.indexOf(course.CourseID) === -1) {
                    enrollmentPromises.push($http
                        .post("/api/EnrollmentWeb", {
                            CourseID: course.CourseID,
                            StudentID: $scope.student.StudentID
                        })
                        .then(null, onError));
                }
                // Remove Enrollment if not selected and exists in orig selection
                else if (courseSelection.indexOf(course.CourseID) === -1 && courseSelectionOrig.indexOf(course.CourseID) > -1) {
                    // Get EnrollmentID first
                    var idx = $scope.student.Courses.findIndex(T => T.CourseID === course.CourseID);
                    var enrollmentId = $scope.student.Courses[idx].EnrollmentID;

                    enrollmentPromises.push($http
                        .delete("/api/EnrollmentWeb/" + enrollmentId)
                        .then(null, onError));
                }
            });

            // Wait for all promises to finish before moving to "main"
            $q.all(enrollmentPromises).then(function() {
                $location.path("/main");
            });
        };

        getStudent($routeParams.studentId);
    };

    angular.module("studentApp").controller("EditController", EditController);
})();
