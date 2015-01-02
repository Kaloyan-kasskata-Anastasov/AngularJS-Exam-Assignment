adsApp.run(function ($cookieStore) {
    if ($cookieStore.get('access_token')) {
        logged = true;
        barOut = false;
        barLogged = true;
    }
    else {
        logged = false;
        barOut = true;
        barLogged = false;
    }
});