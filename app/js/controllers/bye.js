adsApp.controller('Bye', function ($scope, $timeout,$location) {
    $timeout(function () {location.reload();$location.path('/home');}, 5000);
});