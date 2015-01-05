adsApp.controller('AddPoster', function ($scope, staticFuncs,$location) {
    $scope.newDataSelectedAd = {};

    $scope.attachFile = function () {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.newDataSelectedAd.imageDataURL = reader.result;
            $('#imgDisplay').attr('src', reader.result);

        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }
    $scope.ok = function () {
//        console.log($scope.newDataSelectedAd);
        staticFuncs.addAd($scope.newDataSelectedAd);
        $scope.newDataSelectedAd = {};
        $('#imgDisplay').attr('src', '');
    };
    $scope.cancel = function(){
        $location.path('/user/userPosters');
    };
});