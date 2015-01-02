adsApp.config(function ($routeProvider,AUTH_EVENTS) {
    //$locationProvider.html5Mode(true);
    //$locationProvider

    $routeProvider
        .when('/addPoster',
        {
            templateUrl: 'partials/addPoster.html'
        })
        .when('/editProfile',
        {
            templateUrl: 'partials/editProfile.html'
        })
        .when('/userPosters',
        {
            templateUrl: 'partials/userPosters.html'
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