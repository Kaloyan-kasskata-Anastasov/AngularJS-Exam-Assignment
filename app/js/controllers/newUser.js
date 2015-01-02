angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.form.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
});
adsApp.controller('NewUser', function ($scope, publicData,$location) {
    $scope.register = function () {
        publicData.register(
            $scope.newUser,
            function (data, status, headers, config) {
                $scope.userData = data;
                $location.path('/home');
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            });
    }
    $scope.reset = function() {
        if (form) {
           $scope.newUser = {};
        }
    };
    $scope.reset();
});