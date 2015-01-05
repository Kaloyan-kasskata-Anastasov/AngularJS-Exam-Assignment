var logged = false;
var isAdmin = false;
var adminNav = false;

adsApp.controller('SignedUser', function ($scope, publicData, $rootScope, $location, $cookieStore, staticFuncs, $modal) {
    $scope.statusFilter = '';
    $scope.username = $cookieStore.get('username');

    $scope.barOut = true;
    $scope.barLoged = false;
    $scope.adminNav = false;

    $scope.goTo = function (path) {
        if (logged = true) {
            $location.path('/user/' + path + '');
        }
        if (logged = true && isAdmin == true) {
            $location.path('/admin/' + path + '');
        }
    }

    $scope.logout = function () {
        $scope.barOut = true;
        $scope.barLoged = false;
        $scope.adminNav = false;
        $cookieStore.remove('access_token');
        $cookieStore.remove('username');
        $rootScope.userAds = {};
        $location.path('/home');
    }

    $scope.login = function () {
        publicData.login(
            $scope.user,
            function (data, status, headers, config) {
                $scope.userData = data;
                $cookieStore.put('access_token', $scope.userData.access_token);
                $cookieStore.put('username', $scope.userData.username);
                $location.path('/user/userPosters');
                $scope.barOut = false;
                $scope.barLoged = true;
                $scope.onErrorLogin = false;
                logged = true;
                if ($cookieStore.get('username') === 'admin') {
                    isAdmin = true;
                    $scope.barLoged = false;
                    $scope.adminNav = true;
                    $scope.user.username = '';
                    $location.path('/user/allPosters');
                }
                $scope.username = $cookieStore.get('username');
                staticFuncs.alertFade('success', 'Login success');
                $scope.user.password = '';
            },
            function (error, status, headers, config) {
                $scope.onErrorLogin = true;
                staticFuncs.alertFade('danger', 'Login failed. Please try again.');
            }
        );
    }
    $scope.adminNav = adminNav;
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
            null,
            null,
            function (data, status, headers, config) {
                $rootScope.userAds = data;
                window.scrollTo(0, 0);
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Page change failed. Please try again later.');
            }
        );
    }

    function getUserAds() {
        publicData.getUserAds(
            $cookieStore.get('access_token'),
            function (data, status, headers, config) {
                $rootScope.userAds = data;
                $scope.currentPage = 1;
                $scope.totalItems = data.numItems;
                $scope.numberOfPages = data.numPages;
                $scope.itemsPerPage = 7;
                publicData.pageChangeTo(
                    $cookieStore.get('access_token'),
                    'user/ads',
                    $scope.currentPage,
                    $scope.itemsPerPage,
                    null,
                    null,
                    function (data, status, headers, config) {
                        $rootScope.userAds = data;
                    },
                    function (error, status, headers, config) {
                        staticFuncs.alertFade('danger', 'Page change failed. Please try again later.');
                    }
                );
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            }
        );
    }

    getUserAds();

    $scope.filterByStatus = function (status) {
        $scope.statusFilter = status;
    }

    $scope.deactivateAd = function (adId) {
        publicData.deactivateUserAd(
            $cookieStore.get('access_token'),
            adId.id,
            function (data, status, headers, config) {
                getUserAds();
                staticFuncs.alertFade('success', data.message);

            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
                staticFuncs.alertFade('danger', 'Deactivation on Poster failed. Please try again later.');

            }
        );
    }

    $scope.publishAd = function (data) {
        publicData.publishUserAd(
            $cookieStore.get('access_token'),
            data.id,
            function (data, status, headers, config) {
                staticFuncs.alertFade('success', data.message);
                getUserAds();
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Publish this Poster failed. Please try again later.');
            }
        );
    }

    function deleteAd(data) {
        publicData.deleteUserAd(
            $cookieStore.get('access_token'),
            data.id,
            function (data, status, headers, config) {
                getUserAds();
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Deletion operation failed. Please try again later.');
            }
        );
    }

    $scope.deleteAd = function (data) {
        deleteAd(data);
        getUserAds();
    }

    $scope.modalDelete = function (selectedAd) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/modalDelete.html',
            controller: function ($scope, $modalInstance, ad) {
                $scope.ad = ad;

                $scope.ok = function () {
                    deleteAd(selectedAd);
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };
            },
            size: 'lg',
            resolve: {
                ad: function () {
                    return selectedAd;
                }
            }
        });
    };

    function editAd(data) {
        publicData.editUserAd(
            $cookieStore.get('access_token'),
            data.id,
            data,
            function (data, status, headers, config) {
                staticFuncs.alertFade('info', 'Wrong');
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Edit on Poster failed. Please try again later.');
            }
        );
    }

    $scope.editAd = function (data) {
        editAd(data);
        getUserAds();
    }
    $scope.modalEdit = function (selectedAd) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/modalEdit.html',
            controller: 'EditModule',
            size: 'lg',
            resolve: {
                ad: function () {
                    return selectedAd;
                }
            }
        });
    };

    $("#imgInp").change(function () {
        readURL(this);
    });
})