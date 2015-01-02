var logged = false;
var barOut;
var barLogged;

adsApp.controller('SignedUser',function ($scope, AUTH_EVENTS, publicData, $location, $cookieStore, $rootScope) {

    $scope.goTo = function (path) {
        if (logged = true) {
            $location.path('/' + path + '');
        }
    }

    $scope.logout = function () {
        barOut = true;
        barLogged = false;
        $cookieStore.remove('access_token');
        $cookieStore.remove('username');
        $location.path('/bye');
    }

    $scope.login = function () {
        publicData.login(
            $scope.user,
            function (data, status, headers, config) {
                $scope.userData = data;
                sessionStorage.setItem('access_token', $scope.userData.access_token);
                $cookieStore.put('access_token', $scope.userData.access_token);
                $cookieStore.put('username', $scope.userData.username);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $location.path('/home');
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

}).constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});
