
if(!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
    window.location.href = '/acceso';
}

const logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if(sessionStorage.getItem('googleUser')) {
        signOut();
    }
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/acceso'

})

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

window.addEventListener('load', (e) => {
    onLoad();
})

window.onLoad = function() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
}