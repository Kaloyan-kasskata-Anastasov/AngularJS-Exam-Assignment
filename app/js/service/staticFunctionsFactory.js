adsApp.factory('staticFuncs', function publicData($rootScope,publicData,$cookieStore) {
    function editAd(data) {
        publicData.editUserAd(
            $cookieStore.get('access_token'),
            data.id,
            data,
            function (data, status, headers, config) {
                publicData.getUserAds(
                    $cookieStore.get('access_token'),
                    function (data, status, headers, config) {
                        $rootScope.userAds = data;
                    },
                    function (error, status, headers, config) {
                        return error;
                    }
                );
            },
            function (error, status, headers, config) {
                var errorStack = error;
            }
        );
    }

    function addAd(data) {
        publicData.addAd(
            $cookieStore.get('access_token'),
            data,
            function (data, status, headers, config) {
                publicData.getUserAds(
                    $cookieStore.get('access_token'),
                    function (data, status, headers, config) {
                        $rootScope.userAds = data;
                    },
                    function (error, status, headers, config) {
                        return error;
                    }
                );
            },
            function (error, status, headers, config) {
                var errorStack = error;
            }
        );
    }

    function alertFade(type,message){
        //alerts: info, warning, success, danger
        var $div = $('<div id="addSuccess" class="alert alert-'+type+'">'+message+'</div>');
        $('#alerts').append($('<div id="addSuccess" class="alert alert-'+type+'">'+message+'</div>'));
        $('#alerts').children().fadeIn().delay(3000).fadeOut('slow',function(){$(this).remove();});
    }

    return{
        editAd:editAd,
        addAd:addAd,
        alertFade:alertFade
    }
});