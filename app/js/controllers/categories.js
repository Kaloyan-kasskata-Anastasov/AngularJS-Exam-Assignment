adsApp.controller('Categories', function ($scope, publicData) {
    publicData.getCategories(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });
});