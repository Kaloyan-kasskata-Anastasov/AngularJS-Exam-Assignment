adsApp.config(function ($routeProvider) {

    $routeProvider
        .when('/user/addPoster',
        {
            templateUrl: 'partials/addPoster.html',
            controller:'AddPoster'
        })
        .when('/user/editProfile',
        {
            templateUrl: 'partials/editProfile.html',
            controller:'EditProfile'
        })
        .when('/user/userPosters',
        {
            templateUrl: 'partials/userPosters.html'
        })
        .when('/user/home',
        {
            templateUrl: 'partials/home.html'
        })
        .when('/admin/home',
        {
            templateUrl: 'partials/home.html'
        })
        .when('/register',
        {
            templateUrl: 'partials/register.html'
        })
        .when('/home',
        {
            templateUrl: 'partials/home.html'
        })
        .when('/admin/allPosters',
        {
            templateUrl: 'partials/allPosters.html',
            controller:'Admin'
        })
        .when('/admin/users',
        {
            templateUrl: 'partials/users.html',
            controller:'Admin'
        })
        .when('/admin/categories-towns',
        {
            templateUrl: 'partials/categoriesAndTowns.html',
            controller:'Admin'
        })
        .when('/admin/towns',
        {
            templateUrl: 'partials/towns.html',
            controller:'Admin'
        })
        .otherwise(
        {
            redirectTo: '/home'
        });
});
//adPoster