import '../css/global.css'
import './global';
import '../css/login.css'
import { animations } from './animations';
import anime from 'animejs/lib/anime.es.js';

const loginContainer = document.getElementById('loginContainer')
const welcome        = document.getElementById('welcome');
const buttonLogin    = document.getElementById('buttonLogin');
const buttonRegister = document.getElementById('buttonRegister');

buttonRegister.addEventListener('click', () => {
    buttonRegister.classList.add('active');
    buttonLogin.classList.remove('active');
    // askForResize();

    anime({
        targets: 'form.login',
        opacity: 0,
        duration: 500,
        display: false,
        easing: 'easeInExpo',
        complete: function(anim) {
            // askForResize();
            document.querySelector('form.login').style.display = 'none';
            document.querySelector('form.register').style = `
                opacity: 0;
                display: block;
                left: 100%;
            `
            askForResize();
            anime({
                targets: 'form.register',
                opacity: 1,
                // position: 'relative',
                left: '0%',
                duration: 200,
                display: false,
                easing: 'linear',
                complete: function(anim) {
                    // askForResize();
                }
              });
          }
      });
})

buttonLogin.addEventListener('click', () => {
    buttonLogin.classList.add('active');
    buttonRegister.classList.remove('active');
    anime({
        targets: 'form.register',
        opacity: 0,
        duration: 500,
        display: false,
        easing: 'easeInExpo',
        complete: function(anim) {
            document.querySelector('form.register').style.display = 'none';
            document.querySelector('form.login').style = `
                opacity: 0;
                display: block;
                left: 100%;
            `
            askForResize();
            anime({
                targets: 'form.login',
                opacity: 1,
                left: '0%',
                duration: 200,
                display: false,
                easing: 'linear',
                complete: function(anim) {
                    askForResize();
                }
              });
          }
      });
      
})


window.addEventListener('load', () => {
    askForResize();
})

window.addEventListener('resize', () => {
    askForResize();
})


//========================================================================================
/*                                                                                      *
 *                                       FUNCIONES                                      *
 *                                                                                      */
//========================================================================================
function askForResize() {
    console.log('event called');
    
    if(window.screen.width <= 768) {
        resizeElements();
    } else {
        undoResizeElements();
    }
}

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