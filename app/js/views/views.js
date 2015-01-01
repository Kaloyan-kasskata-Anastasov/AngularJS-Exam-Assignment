adsApp.config(function ($routeProvider) {
    //$locationProvider.html5Mode(true);
    //$locationProvider
    $routeProvider
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
