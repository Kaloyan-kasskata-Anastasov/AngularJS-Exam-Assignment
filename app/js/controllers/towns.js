adsApp.controller('Towns', function ($scope, publicData) {
    publicData.getTowns(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });
});