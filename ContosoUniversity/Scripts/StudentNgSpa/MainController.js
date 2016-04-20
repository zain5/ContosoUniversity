(function() {
    var MainController = function($scope, $http) {
        var getStudents = function() {
            $http.get("/api/StudentWeb").then(onGetStudents, onError);
        };

        var onGetStudents = function(response) {
            $scope.students = response.data;
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch data. Server might be down.";
        };

        var onDeleteStudent = function(response) {
            var deletedStudent = response.data;
            var idx = $scope.students.findIndex(function(student) {
                return student.StudentID === deletedStudent.StudentID;
            });
            $scope.students.splice(idx, 1);
            // $scope.$apply();
        }

        $scope.deleteStudent = function(student) {
            if (confirm("Are you sure you want to delete " + student.FirstName + " " + student.LastName + "?")) {
                $http.delete("/api/StudentWeb/" + student.StudentID)
                    .then(onDeleteStudent);
            }
        };

        getStudents();
    };

    angular.module("studentApp").controller("MainController", MainController);
})();