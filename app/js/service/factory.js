adsApp.factory('publicData', function publicData($http) {
    function getAll(success, error) {
        $http({
            method: 'GET',
            url: 'http://softuni-ads.azurewebsites.net/api/ads'
        })
            .success(function (data, status, headers, config) {
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
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    return{
        getAll: getAll,
        getCategories: getCategories
    }
});