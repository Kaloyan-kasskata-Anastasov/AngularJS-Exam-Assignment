adsApp.controller('Towns', function ($scope, publicData,staticFuncs) {
    publicData.getTowns(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            staticFuncs.alertFade('danger', 'Load towns failed. Please try again later.');
        });
});