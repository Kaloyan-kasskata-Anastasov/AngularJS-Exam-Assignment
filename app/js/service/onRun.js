adsApp.run(function ($cookieStore) {
    if ($cookieStore.get('access_token')) {
        logged = true;
        barOut = false;
        barLogged = true;
        if($cookieStore.get('username')=='admin'){
            barLogged = false;
            isAdmin = true;
            adminNav = true;
        }
    }
    else {
        logged = false;
        barOut = true;
        barLogged = false;
        isAdmin = false;
    }
});