var logged = false;
var barOut;
var barLogged;

adsApp.controller('SignedUser', function ($scope, publicData, $location, $cookieStore) {

    $scope.goTo = function (path) {
        if (logged = true) {
            $location.path('/user/' + path + '');
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
                $cookieStore.put('access_token', $scope.userData.access_token);
                $cookieStore.put('username', $scope.userData.username);
                $location.path('/user/home');
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

    $scope.pageSizeChanged = function (value) {
        $scope.itemsPerPage = value;
        $scope.pageChanged();
    }

    $scope.pageChanged = function () {
        publicData.pageChangeTo(
            $cookieStore.get('access_token'),
            'user/ads',
            $scope.currentPage,
            $scope.itemsPerPage,
            function (data, status, headers, config) {
                $scope.userAds = data;
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            });
    }

    publicData.getUserAds(
        $cookieStore.get('access_token'),
        function (data, status, headers, config) {
            $scope.userAds = data;
            $scope.currentPage = 1;
            $scope.totalItems = data.numItems;
            console.log($scope.totalItems);
            $scope.numberOfPages = data.numPages;
            console.log(data.numItems);
            $scope.itemsPerPage = 7;
            publicData.pageChangeTo(
                $cookieStore.get('access_token'),
                'user/ads',
                $scope.currentPage,
                $scope.itemsPerPage,
                function (data, status, headers, config) {
                    $scope.userAds = data;
                },
                function (error, status, headers, config) {
                    $scope.errorStack = error;
                });
        },
        function (error, status, headers, config) {
            $scope.errorStack = error;
        });
})