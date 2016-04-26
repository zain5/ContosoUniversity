(function() {
    var universityService = function($http) {

        // Student operations

        var getStudents = function() {
            $http.get("/api/StudentWeb").then((response) => response.data);
        };

        var getStudent = function(studentId) {
            $http.get("/api/StudentWeb/" + studentId).then((response) => response.data);
        };

        var deleteStudent = function(studentId) {
            $http.delete("/api/StudentWeb/" + studentId).then((response) => response.data);
        };

        var updateStudent = function(student) {
            $http
                .put("/api/StudentWeb/" + student.StudentID, {
                    StudentID: student.StudentID,
                    FirstName: student.FirstName,
                    LastName: student.LastName,
                    EnrollmentDate: student.EnrollmentDate
                })
                .then((response) => response.data);
        };

        var createStudent = function(firstName, lastName, enrollDate) {
            $http
                .post("/api/StudentWeb", {
                    FirstName: firstName,
                    LastName: lastName,
                    EnrollmentDate: enrollDate
                })
                .then((response) => response.data);
        };


        // Enrollment operations

        var addEnrollment = function(courseId, studentId) {
            $http
                .post("/api/EnrollmentWeb", {
                    CourseID: courseId,
                    StudentID: studentId
                })
                .then((response) => response.data);
        };

        var deleteEnrollment = function(enrollmentId) {
            $http
                .delete("/api/EnrollmentWeb/" + enrollmentId)
                .then((response) => response.data);
        };


        // Course operations

        var getCourses = function() {
            $http.get("/api/CourseWeb").then((response) => response.data);
        };

        var addCourse = function() {

        };

        var deleteCourse = function() {

        };

        var updateCourse = function() {

        };

    };

    angular.module("studentApp").factory("universityService", universityService);
})();
