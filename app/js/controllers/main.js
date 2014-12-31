var categoryFilter = '';
var townFilter = '';

adsApp.controller('Main', function ($scope, publicData) {
    publicData.getAll(
        function (data, status, headers, config) {
            $scope.data = data;
            $scope.currentPage = 1;
            $scope.totalItems = data.numItems;
            $scope.numberOfPages=data.numPages;
            $scope.itemsPerPage = 10;
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });

    $scope.pageChanged = function () {
        publicData.pageChangeTo(
            $scope.currentPage,
            $scope.itemsPerPage,
            function (data, status, headers, config) {
                $scope.data = data;
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            });
        console.log($scope.currentPage);
    };

    $scope.filterByCategory = function (categoryId) {
        categoryFilter = categoryId;
    }
    $scope.filterByTown = function (townId) {
        townFilter = Number(townId);
        townFilter = townFilter - 1;
    }
    $scope.categoryFilter = categoryFilter;
    $scope.townFilter = townFilter;

});