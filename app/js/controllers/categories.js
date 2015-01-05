adsApp.controller('Categories', function ($scope, publicData, staticFuncs) {
    publicData.getCategories(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            staticFuncs.alertFade('danger', 'Load category failed. Please try again later.');
        });
});