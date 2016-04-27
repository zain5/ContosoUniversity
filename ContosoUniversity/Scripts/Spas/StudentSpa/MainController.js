(function() {
    var MainController = function($scope, universityService) {
        var getStudents = function() {
            universityService.getStudents().then(onGetStudents, onError);
        };

        var onGetStudents = function(data) {
            $scope.students = data;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch data. Server might be down.";
        };

        var onDeleteStudent = function(data) {
            var deletedStudent = data;
            var idx = $scope.students.findIndex(function(student) {
                return student.StudentID === deletedStudent.StudentID;
            });
            $scope.students.splice(idx, 1);
        }

        $scope.deleteStudent = function(student) {
            if (confirm("Are you sure you want to delete " + student.FirstName + " " + student.LastName + "?")) {
                universityService.deleteStudent(student.StudentID).then(onDeleteStudent);
            }
        };

        getStudents();
    };

    angular.module("universityApp").controller("MainController", MainController);
})();