adsApp.factory('staticFuncs', function publicData($rootScope, publicData, $cookieStore) {
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
                        alertFade('success', 'Successfully Edited. Don\'t forget to submit it for publishing.');
                    },
                    function (error, status, headers, config) {
                        alertFade('danger', 'Load your Posters failed. Please try again later.');
                    }
                );
            },
            function (error, status, headers, config) {
                alertFade('danger', 'Edit this Poster failed. Please try again later.');
            }
        );
    }

    function addAd(data) {
        publicData.addAd(
            $cookieStore.get('access_token'),
            data,
            function (data, status, headers, config) {
                alertFade('success', data.message);
                publicData.getUserAds(
                    $cookieStore.get('access_token'),
                    function (data, status, headers, config) {
                        $rootScope.userAds = data;
                    },
                    function (error, status, headers, config) {
                        alertFade('danger', 'Load your Posters failed. Please try again later.');
                    }
                );
            },
            function (error, status, headers, config) {
                alertFade('danger', 'Add this Poster failed. Please try again later.');
            }
        );
    }

    function alertFade(type, message) {
        //alerts: info, warning, success, danger
        window.scrollTo(0, 0);
        $('#alerts').append($('<div id="addSuccess" class="alert alert-' + type + '">' + message + '</div>'));
        $('#alerts').children().fadeIn().delay(3000).fadeOut('slow', function () {
            $(this).remove();
        });
    }

    return{
        editAd: editAd,
        addAd: addAd,
        alertFade: alertFade
    }
});