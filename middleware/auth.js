import Cookie from 'js-cookie'
export default function ({ route, req, res, redirect, error, store }) {
    function getcookiesInServer(req) {
        let service_cookie = {};
        req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
            let parts = val.split('=');
            service_cookie[parts[0].trim()] = (parts[1] || '').trim();
        });
        return service_cookie;
    }

    function getcookiesInClient(key) {
        return Cookie.get(key) ? Cookie.get(key) : ''
    }

    let isClient = process.client;
    let isServer = process.server;
    let redirectURL = '/login';
    var authUser, path

    if (isServer) {
        let cookies = getcookiesInServer(req)
        path = req.originalUrl;
        authUser = cookies.authUser ? cookies.authUser : ''
    }

    if (isClient) {
        authUser = getcookiesInClient('authUser')
        path = route.path;
        console.log('authUser------', authUser)
        console.log('path------', path)
    }

    if (path) {
        redirectURL = '/login'
    }

    if (!authUser) {
        redirect(redirectURL)
    }
}
