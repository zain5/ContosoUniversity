(function() {
    var RootController = function($scope) {
        $scope.rootMsg = "Hello World from Root!!";
    };

    angular.module("studentApp").controller("RootController", RootController);
})();