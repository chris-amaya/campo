import '../css/global.css'
import './global';
import '../css/login.css'
import { animations } from './animations';
const loginContainer = document.getElementById('loginContainer')
const welcome        = document.getElementById('welcome');
const buttonLogin    = document.getElementById('buttonLogin');
const buttonRegister = document.getElementById('buttonRegister');



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


//========================================================================================
/*                                                                                      *
 *                                       FUNCIONES                                      *
 *                                                                                      */
//========================================================================================


function resizeElements() {
    loginContainer.style = `
        top: ${window.innerHeight - welcome.offsetHeight}px;
        height: ${loginContainer.firstElementChild.offsetHeight}px;
    `
}

function undoResizeElements() {
    loginContainer.style = `
        top: 0;
        height: 100%;
    `
}