adsApp.controller('Main', function ($scope, publicData) {
    publicData.getAll(
        function (data, status, headers, config) {
            $scope.data = data;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });
});