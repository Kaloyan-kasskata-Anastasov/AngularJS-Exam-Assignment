var categoryFilter = '';
var townFilter = '';

adsApp.controller('Main', function ($scope, publicData, $location, staticFuncs) {
    $scope.currentPage = 1;
    function getAll() {
        publicData.getAll(
            function (data, status, headers, config) {
                $scope.totalItems = data.numItems;
                $scope.numberOfPages = data.numPages;
                $scope.itemsPerPage = 7;
                publicData.pageChangeTo(
                    null,
                    'ads',
                    $scope.currentPage,
                    $scope.itemsPerPage,
                    categoryFilter,
                    townFilter,
                    function (data, status, headers, config) {
                        $scope.data = data;
                    },
                    function (error, status, headers, config) {
                        staticFuncs.alertFade('danger', 'Page request failed. Please try again later.');
                    });
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Load all Posters failed. Please try again later.');
            }
        );
    }
    getAll();

    $scope.pageSizeChanged = function (value) {
        $scope.itemsPerPage = value;
    }

    $scope.cancel = function () {
        $location.path('/home');
    }

    $scope.pageChanged = function () {
        publicData.pageChangeTo(
            null,
            'ads',
            $scope.currentPage,
            $scope.itemsPerPage,
            categoryFilter,
            townFilter,
            function (data, status, headers, config) {
                $scope.data = data;
                window.scrollTo(0, 0);
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Page request failed. Please try again later.');
            }
        );
    }

    $scope.filterByCategory = function (categoryId) {
        categoryFilter = categoryId;
        $scope.pageChanged();
    }
    $scope.filterByTown = function (townId) {
        townFilter = Number(townId);
        $scope.pageChanged();
    }
    $scope.categoryFilter = categoryFilter;
    $scope.townFilter = townFilter;

});