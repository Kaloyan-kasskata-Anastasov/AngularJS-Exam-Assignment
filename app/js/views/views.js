adsApp.config(function ($routeProvider) {

    $routeProvider
        .when('/user/addPoster',
        {
            templateUrl: 'partials/addPoster.html',
            controller:'AddPoster'
        })
        .when('/user/editProfile',
        {
            templateUrl: 'partials/editProfile.html'
        })
        .when('/user/userPosters',
        {
            templateUrl: 'partials/userPosters.html'
        })
        .when('/user/home',
        {
            templateUrl: 'partials/home.html'
        })
        .when('/register',
        {
            templateUrl: 'partials/register.html'
        })
        .when('/login',
        {
            templateUrl: 'partials/login.html'
        })
        .when('/home',
        {
            templateUrl: 'partials/home.html'
        })
        .when('/bye',
        {
            templateUrl: 'partials/bye.html'
        })
        .otherwise(
        {
            redirectTo: '/home'
        });
});
//adPoster