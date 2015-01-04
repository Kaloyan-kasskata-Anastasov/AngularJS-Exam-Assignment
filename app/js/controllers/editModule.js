adsApp.controller('EditModule', function ($scope, $modalInstance, ad, staticFuncs) {
    console.log(ad);
    $scope.newDataSelectedAd = {};
    $scope.newDataSelectedAd.id = ad.id;
    $scope.ad = ad;

    $scope.attachFile = function () {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.newDataSelectedAd.imageDataURL = reader.result;
            $scope.newDataSelectedAd.changeImage = true;
            $('#imgDisplay').attr('src', reader.result);

        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    $scope.ok = function () {
        var id = $scope.newDataSelectedAd.id ? $scope.newDataSelectedAd.id : ad.id;
        var text = $scope.newDataSelectedAd.text ? $scope.newDataSelectedAd.text : ad.text;
        var title = $scope.newDataSelectedAd.title ? $scope.newDataSelectedAd.title : ad.title;
        var townId = $scope.newDataSelectedAd.townId;
        var categoryId = $scope.newDataSelectedAd.categoryId;
        var imageDataURL = $scope.newDataSelectedAd.imageDataURL ? $scope.newDataSelectedAd.imageDataURL : ad.imageDataUrl;
        var changeImage = imageDataURL ? true : false;
        var updateAd = {changeImage: changeImage, title: title, text: text, categoryId: categoryId, id: id, imageDataURL: imageDataURL, townId: townId};
        console.log(updateAd);
        staticFuncs.editAd(updateAd);
        $modalInstance.close();
    };
    $scope.deleteImage = function () {
        $scope.newDataSelectedAd.imageDataURL = null;
        ad.imageDataUrl = null;
    }
    $scope.cancel = function () {
        $modalInstance.close();
    };
});