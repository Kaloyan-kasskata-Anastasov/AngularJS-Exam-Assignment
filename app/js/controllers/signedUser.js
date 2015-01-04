var logged = false;
var barOut;
var barLogged;

adsApp.controller('SignedUser', function ($scope, publicData, $rootScope, $location, $cookieStore, $modal) {
    $scope.statusFilter = '';
    $scope.username = $cookieStore.get('username');

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
                $location.path('/user/userPosters');
                $scope.barOut = false;
                $scope.barLoged = true;
                $scope.onErrorLogin = false;
                logged = true;
                $scope.username = $cookieStore.get('username');
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
                $scope.onErrorLogin = true;
            }
        );
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
                $rootScope.userAds = data;
                window.scrollTo(0, 0);
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
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
                    function (data, status, headers, config) {
                        $rootScope.userAds = data;
                    },
                    function (error, status, headers, config) {
                        $scope.errorStack = error;
                    }
                );
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            });
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
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
            }
        );
    }

    $scope.publishAd = function (data) {
        publicData.publishUserAd(
            $cookieStore.get('access_token'),
            data.id,
            function (data, status, headers, config) {
                getUserAds();
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
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
                $scope.errorStack = error;
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
                publicData.getUserAds();
            },
            function (error, status, headers, config) {
                $scope.errorStack = error;
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