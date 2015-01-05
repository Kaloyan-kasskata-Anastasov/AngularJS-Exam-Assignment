adsApp.controller('EditModule', function ($scope, $modalInstance, ad, publicData, $cookieStore, staticFuncs) {
    $scope.advertisementStatus = [
        {id:0,status:'Inactive'},
        {id:1,status:'WaitingApproval'},
        {id:2,status:'Published'},
        {id:3,status:'Rejected'}];

    $scope.newDataSelectedAd = {};
    $scope.newDataSelectedAd.id = ad.id;
    $scope.newDataSelectedAd = ad;
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
    $scope.adminOk = function () {
        var id = $scope.newDataSelectedAd.id ? $scope.newDataSelectedAd.id : ad.id;
        var text = $scope.newDataSelectedAd.text ? $scope.newDataSelectedAd.text : ad.text;
        var title = $scope.newDataSelectedAd.title ? $scope.newDataSelectedAd.title : ad.title;
        var townId = $scope.newDataSelectedAd.townId;
        var categoryId = $scope.newDataSelectedAd.categoryId;
        var imageDataURL = $scope.newDataSelectedAd.imageDataURL ? $scope.newDataSelectedAd.imageDataURL : ad.imageDataUrl;
        var changeImage = imageDataURL ? true : false;
        switch($scope.newDataSelectedAd.status){
            case'Inactive':$scope.newDataSelectedAd.status=0;break;
            case'WaitingApproval':$scope.newDataSelectedAd.status=1;break;
            case'Published':$scope.newDataSelectedAd.status=2;break;
            case'Rejected':$scope.newDataSelectedAd.status=3;break;
        }
        var updateAd = {changeImage: changeImage,date:$scope.newDataSelectedAd.date,status:$scope.newDataSelectedAd.status, title: title, text: text, categoryId: categoryId, id: id, imageDataURL: imageDataURL, townId: townId};
        console.log(updateAd.date);


        publicData.adminEditAd(
            $cookieStore.get('access_token'),
            updateAd.id,
            updateAd,
            function (data, status, headers, config) {
                $scope.data = data;
            },
            function (error, status, headers, config) {
                staticFuncs.alertFade('danger', 'Edit request failed. Please try again later.');
            }
        );
        $modalInstance.close();
    };
});