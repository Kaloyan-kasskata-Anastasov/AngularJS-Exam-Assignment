adsApp.controller('Categories', function ($scope, publicData) {
    publicData.getAll(
        function (data, status, headers, config) {
            $scope.data = data;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });

    publicData.getCategories(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });
});