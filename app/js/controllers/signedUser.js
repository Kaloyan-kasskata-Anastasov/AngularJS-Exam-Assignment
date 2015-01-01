var logged = false;
var barOut;
var barLogged;

adsApp.controller('SignedUser',function ($scope, publicData, $location, $cookieStore) {

    $scope.logout = function () {
        barOut = true;
        barLogged = false;
        $cookieStore.remove('access_token');
        $location.path('/bye');
    }

    $scope.login = function () {
        publicData.login(
            $scope.user,
            function (data, status, headers, config) {
                $scope.userData = data;
                sessionStorage.setItem('access_token', $scope.userData.access_token);
                $cookieStore.put('access_token', $scope.userData.access_token);
                $location.path("/home");
                $scope.barOut = false;
                $scope.barLoged = true;
                $scope.onErrorLogin = false;
                logged = true;
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
                $scope.onErrorLogin = true;
            });
    }
    $scope.barOut = barOut;
    $scope.barLoged = barLogged;

}).run(function ($cookieStore) {
    if ($cookieStore.get('access_token')) {
        logged = true;
        barOut = false;
        barLogged = true;
    }
    else {
        logged = false;
        barOut = true;
        barLogged = false;
    }
});
