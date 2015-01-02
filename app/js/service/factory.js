adsApp.factory('publicData', function publicData($http) {
    function getAll(success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/ads'
        })
            .success(function (data, status, headers, config) {
                console.log("getAll");
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
                console.log("getCategory");
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
                console.log("getTowns");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function pageChangeTo(token,route,page,limit,success,error){
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/'+route+'?startpage='+page+'&pagesize='+limit,
            headers:{Authorization: 'Bearer '+token}
    })
            .success(function (data, status, headers, config) {
                console.log("Paging");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function register(data,success,error){
        $http({
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/register',
            data:JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                console.log("Register");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function login(data,success,error){
        $http({
            method: 'POST',
            url: 'http://softuni-ads.azurewebsites.net/api/user/login',
            data:JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
                console.log("Login");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function getUserAds(token,success,error){
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/user/ads',
            headers:{Authorization: 'Bearer '+token}
        })
            .success(function (data, status, headers, config) {
                console.log("Get USER Data");
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    return{
        getAll: getAll,
        getCategories: getCategories,
        getTowns: getTowns,
        pageChangeTo:pageChangeTo,
        register:register,
        login:login,
        getUserAds:getUserAds
    }
});