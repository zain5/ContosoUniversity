(function() {
    var universityService = function($http) {

        // Student operations

        var getStudents = function() {
            return $http.get("/api/StudentWeb").then((response) => response.data);
        };

        var getStudent = function(studentId) {
            return $http.get("/api/StudentWeb/" + studentId).then((response) => response.data);
        };

        var deleteStudent = function(studentId) {
            return $http.delete("/api/StudentWeb/" + studentId).then((response) => response.data);
        };

        var updateStudent = function(student) {
            return $http
                .put("/api/StudentWeb/" + student.StudentID, {
                    StudentID: student.StudentID,
                    FirstName: student.FirstName,
                    LastName: student.LastName,
                    EnrollmentDate: student.EnrollmentDate
                })
                .then((response) => response.data);
        };

        var createStudent = function(firstName, lastName, enrollDate) {
            return $http
                .post("/api/StudentWeb", {
                    FirstName: firstName,
                    LastName: lastName,
                    EnrollmentDate: enrollDate
                })
                .then((response) => response.data);
        };


        // Enrollment operations

        var addEnrollment = function(courseId, studentId) {
            return $http
                .post("/api/EnrollmentWeb", {
                    CourseID: courseId,
                    StudentID: studentId
                })
                .then((response) => response.data);
        };

        var deleteEnrollment = function(enrollmentId) {
            return $http
                .delete("/api/EnrollmentWeb/" + enrollmentId)
                .then((response) => response.data);
        };


        // Course operations

        var getCourses = function() {
            return $http.get("/api/CourseWeb").then((response) => response.data);
        };

        var addCourse = function() {
            return null;
        };

        var deleteCourse = function() {
            return null;
        };

        var updateCourse = function() {
            return null;
        };

        return {
            getStudents: getStudents,
            getStudent: getStudent,
            deleteStudent: deleteStudent,
            createStudent: createStudent,
            updateStudent: updateStudent,
            addEnrollment: addEnrollment,
            deleteEnrollment: deleteEnrollment,
            getCourses: getCourses,
            addCourse: addCourse,
            deleteCourse: deleteCourse,
            updateCourse: updateCourse
        };

    };

    angular.module("universityApp").factory("universityService", universityService);
})();
