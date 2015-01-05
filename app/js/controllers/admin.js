adsApp.controller('Admin', function ($scope, publicData, $cookieStore, staticFuncs,$modal) {
    $scope.advertisementStatus = ['Inactive', 'WaitingApproval', 'Published', 'Rejected'];
    $scope.filter = {};
    $scope.filter.category = '';
    $scope.filter.town = '';
    $scope.filter.status = '';
    $scope.filter.sortBy = '';

    $scope.filterAdminByCategory = function (category) {
        $scope.filter.category = category;
        adminGetAll();
    }

    $scope.filterAdminByTown = function (town) {
        $scope.filter.town = town;
        adminGetAll();
    }

    $scope.filterAdminByStatus = function (status) {
        $scope.filter.status = status;
        adminGetAll();
    }

    $scope.filterAdminSortBy = function (sortBy) {
        $scope.filter.sortBy = sortBy;
    }

    $scope.pageChanged = function () {
        publicData.adminPageChangeTo(
            $cookieStore.get('access_token'),
            'admin/ads',
            $scope.currentPage,
            $scope.itemsPerPage,
            $scope.filter.category,
            $scope.filter.town,
            $scope.filter.status,
            $scope.filter.sortBy,
            function (data, status, headers, config) {
                $scope.data = data;
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Page request failed. Please try again later.');
            }
        );
    }

    function adminGetAll() {
        publicData.adminGetAll(
            $cookieStore.get('access_token'),
            function (data, status, headers, config) {
                $scope.currentPage = 1;
                $scope.totalItems = data.numItems;
                $scope.numberOfPages = data.numPages;
                $scope.itemsPerPage = 7;
                publicData.adminPageChangeTo(
                    $cookieStore.get('access_token'),
                    'admin/ads',
                    $scope.currentPage,
                    $scope.itemsPerPage,
                    $scope.filter.category,
                    $scope.filter.town,
                    $scope.filter.status,
                    $scope.filter.sortBy,
                    function (data, status, headers, config) {
                        $scope.data = data;
                    },
                    function (error, status, headers, config) {
                        staticFuncs.alertFade('danger', 'Page request failed. Please try again later.');
                    }
                );
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Load all Posters failed. Please try again later.');
            }
        );
    }
    adminGetAll();

    $scope.approve = function (ad) {
        publicData.adminApproveAd(
            $cookieStore.get('access_token'),
            ad.id,
            function (data, status, headers, config) {
                staticFuncs.alertFade('success', data.message);
                adminGetAll();
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Approve request failed. Please try again later.');
            }
        );
    }

    $scope.reject = function (ad) {
        publicData.adminRejectAd(
            $cookieStore.get('access_token'),
            ad.id,
            function (data, status, headers, config) {
                staticFuncs.alertFade('success', data.message);
                adminGetAll();
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Reject request failed. Please try again later.');
            }
        );
    }

    $scope.modalEdit = function (selectedAd) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/adminEditModal.html',
            controller: 'EditModule',
            size: 'lg',
            resolve: {
                ad: function () {
                    return selectedAd;
                }
            }
        });
    };

    $scope.adminModalDelete = function (selectedAd) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/modalDelete.html',
            controller: function ($scope, $modalInstance, ad) {
                $scope.ad = ad;

                $scope.ok = function () {
                    publicData.adminDeleteAd(
                        $cookieStore.get('access_token'),
                        selectedAd.id,
                        function (data, status, headers, config) {
                            staticFuncs.alertFade('success', data.message);
                            adminGetAll();
                        },
                        function (error, status, headers, config) {
                            staticFuncs.alertFade('danger', 'Delete Poster request failed. Please try again later.');
                        }
                    );
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

});