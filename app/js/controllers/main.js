var categoryFilter = '';
var townFilter = '';

adsApp.controller('Main', function ($scope, publicData) {
    $scope.townFilter = {};

    publicData.getAll(
        function (data, status, headers, config) {
            $scope.data = data;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });
    $scope.filterByCategory = function (categoryId) {
        categoryFilter = categoryId;
    }
    $scope.filterByTown = function (townId) {
        categoryFilter = townId;
    }

    $scope.categoryFilter = categoryFilter;
    $scope.townFilter = townFilter;
});