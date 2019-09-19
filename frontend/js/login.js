import '../css/global.css'
import './global';
import '../css/login.css'

const loginContainer = document.getElementById('loginContainer')
const welcome        = document.getElementById('welcome');
console.log('asdf');
window.addEventListener('load', () => {
    if(window.screen.width < 720) {
        resizeElements();
    } else {
        undoResizeElements();
    }
})

window.addEventListener('resize', () => {
    if(window.screen.width < 768) {
        resizeElements();
    } else {
        undoResizeElements();
    }
})

function resizeElements() {
    // loginContainer.style.top = `${window.innerHeight - welcome.offsetHeight}px`;
    // loginContainer.style.height = `${loginContainer.firstElementChild.offsetHeight}px`;
    loginContainer.style = `
        top: ${window.innerHeight - welcome.offsetHeight}px;
        height: ${loginContainer.firstElementChild.offsetHeight}px;
    `
}

function undoResizeElements() {
    // loginContainer.style.top = '01';
    // loginContainer.style.height = '100%;';
    loginContainer.style = `
        top: 0;
        height: 100%;
    `

}