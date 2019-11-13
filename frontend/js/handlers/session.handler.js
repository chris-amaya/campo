if(!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
    window.location.href = '/acceso'
}

const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/acceso'
})