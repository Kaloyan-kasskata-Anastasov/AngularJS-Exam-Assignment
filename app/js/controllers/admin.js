adsApp.controller('Admin', function ($scope, publicData, $cookieStore, staticFuncs, $modal) {
    $scope.advertisementStatus = ['Inactive', 'WaitingApproval', 'Published', 'Rejected'];
    $scope.filter = {};
    $scope.filter.category = '';
    $scope.filter.town = '';
    $scope.filter.status = '';
    $scope.filter.sortBy = '';
    $scope.currentPage = 1;

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

    $scope.pageChanged = function (route) {
        publicData.adminPageChangeTo(
            route,
            $scope.currentPage,
            $scope.itemsPerPage,
            $scope.filter.category,
            $scope.filter.town,
            $scope.filter.status,
            $scope.filter.sortBy,
            function (data, status, headers, config) {
                $scope.data = data;
                $scope.usersData = data;
                window.scrollTo(0, 0);
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
                $scope.totalItems = data.numItems;
                $scope.numberOfPages = data.numPages;
                $scope.itemsPerPage = 7;
                publicData.adminPageChangeTo(
                    'admin/ads',
                    $scope.currentPage,
                    $scope.itemsPerPage,
                    $scope.filter.category,
                    $scope.filter.town,
                    $scope.filter.status,
                    $scope.filter.sortBy,
                    function (data, status, headers, config) {
                        $scope.data = data;
                        window.scrollTo(0, 0);

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

    publicData.adminGetUsers(
        function (data, status, headers, config) {
            $scope.totalItems = data.numItems;
            $scope.numberOfPages = data.numPages;
            $scope.itemsPerPage = 7;
            publicData.adminPageChangeTo(
                'admin/users',
                $scope.currentPage,
                $scope.itemsPerPage,
                $scope.filter.category,
                $scope.filter.town,
                $scope.filter.status,
                $scope.filter.sortBy,
                function (data, status, headers, config) {
                    $scope.usersData = data;
                },
                function (error, status, headers, config) {
                    staticFuncs.alertFade('danger', 'Page request failed. Please try again later.');
                }
            );
        },
        function (error, status, headers, config) {
            staticFuncs.alertFade('danger', 'Delete Poster request failed. Please try again later.');
        }
    );
    $scope.modalEditUser = function (selectedUser) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/adminEditUserModal.html',
            controller: 'EditModule',
            size: 'lg',
            resolve: {
                ad: function () {
                    return selectedUser;
                }
            }
        });
    };
    $scope.adminModalDeleteUser = function (user) {
        publicData.adminDeleteUser(
            user,
            function (data, status, headers, config) {
                $scope.usersData = data;
                console.log($scope.usersData);
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Page request failed. Please try again later.');
            }
        );
    }
    $scope.adminModalDeleteUser = function (selectedUser) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/adminModalDeleteUser.html',
            controller: function ($scope, $modalInstance, user) {
                $scope.user = selectedUser;

                $scope.ok = function () {
                    publicData.adminDeleteUser(
                        selectedUser,
                        function (data, status, headers, config) {
                            staticFuncs.alertFade('success', 'User' + selectedUser.username + 'deleted');
                        },
                        function (error, status, headers, config) {
                            staticFuncs.alertFade('danger', 'Delete request failed. Please try again later.');
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
                user: function () {
                    return selectedUser;
                }
            }
        });
    };
    $scope.editCategory = function (id) {
        $scope['isEditClicked' + id] = true;
        $scope.newCategory = {};
    };
    $scope.submitCategory = function (newCategory,method) {
        publicData.adminEditCategory(
            newCategory,
            method,
            function (data, status, headers, config) {
                staticFuncs.alertFade('success', 'Category' + newCategory.id + 'Edited');
                $scope['isEditClicked' + newCategory.id] = false;
                $scope.isAddClicked = false;
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Category' + newCategory.id + 'Edit failed');
            }
        );
    }
    $scope.adminModalDeleteCategory = function (selectedCategory) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/adminModalDeleteCategory.html',
            controller: function ($scope, $modalInstance, category) {
                $scope.category = category;

                $scope.ok = function () {
                    publicData.adminDeleteCategory(
                        category,
                        function (data, status, headers, config) {
                            staticFuncs.alertFade('success', 'Category ID:' + category.id + 'deleted');
                        },
                        function (error, status, headers, config) {
                            staticFuncs.alertFade('danger', 'Delete request failed. Please try again later.');
                        }
                    );
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };
            },
            size: 'md',
            resolve: {
                category: function () {
                    return selectedCategory;
                }
            }
        });
    };
    $scope.addCategory = function(){
        $scope.isAddClicked = !$scope.isAddClicked;
    }
    //TOWNS
    $scope.editTown = function (id) {
        $scope['isEditClicked' + id] = true;
        $scope.newTown = {};
    };
    $scope.submitTown = function (newTown,method) {
        publicData.adminEditTown(
            newTown,
            method,
            function (data, status, headers, config) {
                staticFuncs.alertFade('success', 'Town' + newTown.id + 'Edited');
                $scope['isEditClicked' + newTown.id] = false;
                $scope.isAddClicked = false;
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Town' + newTown.id + 'Edit failed');
            }
        );
    }
    $scope.adminModalDeleteTown = function (selectedTown) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/adminModalDeleteTown.html',
            controller: function ($scope, $modalInstance, town) {
                $scope.town = town;

                $scope.ok = function () {
                    publicData.adminDeleteTown(
                        town,
                        function (data, status, headers, config) {
                            staticFuncs.alertFade('success', 'Town ID:' + town.id + 'deleted');
                        },
                        function (error, status, headers, config) {
                            staticFuncs.alertFade('danger', 'Delete request failed. Please try again later.');
                        }
                    );
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.close();
                };
            },
            size: 'md',
            resolve: {
                town: function () {
                    return selectedTown;
                }
            }
        });
    };
    $scope.addTown = function(){
        $scope.isAddTownClicked = !$scope.isAddTownClicked;
    }
});