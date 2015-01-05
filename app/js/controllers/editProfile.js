adsApp.controller('EditProfile', function ($scope, $cookieStore, staticFuncs, $location, publicData) {

    $scope.username = $cookieStore.get('username');
    publicData.getProfile(
        $cookieStore.get('access_token'),
        function (data, status, headers, config) {
            $scope.profileInfo = data;
            console.log($scope.profileInfo);
            $scope.newUser = $scope.profileInfo;
        },
        function (error, status, headers, config) {
            staticFuncs.alertFade('danger', 'Load Profile request failed. Please try again later.');
        }
    );

    $scope.editUserPassword = function (newPassword) {
        publicData.changeUserPassword(
            $cookieStore.get('access_token'),
            newPassword,
            function (data, status, headers, config) {
                staticFuncs.alertFade('info', data.message);
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Changing password request failed. Please try again later.');
            }
        )
    };

    $scope.cancel = function () {
        $location.path('/user/userPosters');
    };

    $scope.editUserInfo = function (newUser) {
        var townIdAsNumber = newUser.townId;
        newUser.townId = Number(townIdAsNumber);
        console.log(newUser);
        publicData.editUserProfile(
            //        Fixing 500 errors - general
            //        This error can only be resolved by fixes to the Web server software. It is not a client-side problem.
            //        It is up to the operators of the Web server site to locate and analyse the logs which should give further information about the error.
            $cookieStore.get('access_token'),
            function (data, status, headers, config) {
                staticFuncs.alertFade('info', 'Successfully edit your profile.');
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Failed to edit your profile.');
            }
        )
    };
});