var categoryFilter = '';
var townFilter = '';

adsApp.controller('Main', function ($scope, publicData,$location) {
    publicData.getAll(
        function (data, status, headers, config) {
            $scope.currentPage = 1;
            $scope.totalItems = data.numItems;
            $scope.numberOfPages=data.numPages;
            $scope.itemsPerPage = 7;
            publicData.pageChangeTo(
                null,
                'ads',
                $scope.currentPage,
                $scope.itemsPerPage,
                function (data, status, headers, config) {
                    $scope.data = data;
                },
                function (error, status, headers, config) {
                    $scope.errorStack = error;
                });
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });

    $scope.pageSizeChanged=function(value){
        $scope.itemsPerPage = value;
        $scope.pageChanged();
    }

    $scope.cancel = function(){
        $location.path('/home');
    }

    $scope.pageChanged = function () {
        publicData.pageChangeTo(
            null,
            'ads',
            $scope.currentPage,
            $scope.itemsPerPage,
            function (data, status, headers, config) {
                $scope.data = data;
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            });
    }

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