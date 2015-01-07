adsApp.factory('publicData', function publicData($http, $cookieStore) {
    function getAll(success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/ads'
        })
            .success(function (data, status, headers, config) {
//                console.log("getAll");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function getCategories(success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/categories'
        })
            .success(function (data, status, headers, config) {
//                console.log("getCategory");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function getTowns(success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/towns'

        })
            .success(function (data, status, headers, config) {
//                console.log("getTowns");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function pageChangeTo(token, route, page, limit, category, town, success, error) {
        var categoryIdRequest = '';
        var townIdRequest = '';
        if (category) {
            categoryIdRequest = '&CategoryId=' + Number(category);
        }
        if (town) {
            townIdRequest = '&TownId=' + Number(town);
        }
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/' + route + '?startpage=' + page + '&pagesize=' + limit + categoryIdRequest + townIdRequest,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
                window.scrollTo(0, 0);
//                console.log("Paging");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            }
        );
    }

    function register(data, success, error) {
        $http({
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/register',
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
//                console.log("Register");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function login(data, success, error) {
        $http({
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/login',
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
//                console.log("Login");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function getUserAds(token, success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
//                console.log("Get USER Data");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function deactivateUserAd(token, id, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/' + id,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
//                console.log("Deactivate Ad");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function publishUserAd(token, id, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/' + id,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
                console.log("Publish Ad");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function deleteUserAd(token, id, success, error) {
        $http({
            method: 'delete',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + id,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
//                console.log("Delete Ad");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function editUserAd(token, id, data, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads/' + id,
            headers: {Authorization: 'Bearer ' + token},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
//                console.log("Edit Ad");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function addAd(token, data, success, error) {
        $http({
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
            headers: {Authorization: 'Bearer ' + token},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
//                console.log("addAd");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function getProfile(token, success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/Profile',
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
//                console.log("Get USER Profile");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function editUserProfile(token, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/profile',
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
//                console.log("Get USER Profile");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function changeUserPassword(token, data, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/user/changepassword',
            headers: {Authorization: 'Bearer ' + token},
            data: JSON.stringify(data)

        })
            .success(function (data, status, headers, config) {
//                console.log("Get USER Profile");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminGetAll(token, success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads',
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminPageChangeTo(route, page, limit, category, town, status, sortBy, success, error) {
        var sortByRequest = '';
        var statusRequest = '';
        var categoryIdRequest = '';
        var townIdRequest = '';
        if (sortBy) {
            sortByRequest = 'SortBy=' + sortBy;
        }
        if (status) {
            statusRequest = '&Status=' + status;
        }
        if (category) {
            categoryIdRequest = '&CategoryId=' + Number(category);
        }
        if (town) {
            townIdRequest = '&TownId=' + Number(town);
        }
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/' + route + '?startpage=' + page + '&pagesize=' + limit + categoryIdRequest + townIdRequest + statusRequest + sortByRequest,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')}
        })
            .success(function (data, status, headers, config) {
//                console.log("Paging");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            }
        );
    }

    function adminApproveAd(token, id, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/Ads/Approve/' + id,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminRejectAd(token, id, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/Ads/Reject/' + id,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminEditAd(token, id, data, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + id,
            headers: {Authorization: 'Bearer ' + token},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminDeleteAd(token, id, success, error) {
        $http({
            method: 'delete',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/ads/' + id,
            headers: {Authorization: 'Bearer ' + token}
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminGetUsers(success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/users',
            // + '?startpage=' + page + '&pagesize=' + limit + sortByRequest
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')}
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminEditUserMain(data, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/User/' + data.username,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminEditUserPass(data, success, error) {
        $http({
            method: 'PUT',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/SetPassword',
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminDeleteUser(data, success, error) {
        $http({
            method: 'delete',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/user/' + data.username,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')}
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminEditCategory(data,method, success, error) {
        var id = data.id ? data.id : '';
        $http({
            method: method,
            url: 'http://softuni-ads.azurewebsites.net/api/admin/categories/' +id,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminDeleteCategory(data, success, error) {
        $http({
            method: 'DELETE',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/Categories/' + data.id,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminEditTown(data,method, success, error) {
        var id = data.id ? data.id : '';
        $http({
            method: method,
            url: 'http://softuni-ads.azurewebsites.net/api/admin/towns/' +id,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function adminDeleteTown(data, success, error) {
        $http({
            method: 'DELETE',
            url: 'http://softuni-ads.azurewebsites.net/api/admin/Towns/' + data.id,
            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')},
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

//            headers: {Authorization: 'Bearer ' + $cookieStore.get('access_token')}

    return{
        getAll: getAll,
        getCategories: getCategories,
        getTowns: getTowns,
        pageChangeTo: pageChangeTo,
        register: register,
        login: login,
        getUserAds: getUserAds,
        deactivateUserAd: deactivateUserAd,
        publishUserAd: publishUserAd,
        deleteUserAd: deleteUserAd,
        editUserAd: editUserAd,
        addAd: addAd,
        getProfile: getProfile,
        editUserProfile: editUserProfile,
        changeUserPassword: changeUserPassword,
        adminPageChangeTo: adminPageChangeTo,
        adminGetAll: adminGetAll,
        adminApproveAd: adminApproveAd,
        adminRejectAd: adminRejectAd,
        adminEditAd: adminEditAd,
        adminDeleteAd: adminDeleteAd,
        adminGetUsers: adminGetUsers,
        adminEditUserMain: adminEditUserMain,
        adminEditUserPass: adminEditUserPass,
        adminDeleteUser: adminDeleteUser,
        adminEditCategory: adminEditCategory,
        adminDeleteCategory: adminDeleteCategory,
        adminEditTown:adminEditTown,
        adminDeleteTown:adminDeleteTown
    }
});