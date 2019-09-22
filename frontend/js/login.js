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
    loginContainer.style.overflow = 'hidden';

    anime({
        targets: 'form.login',
        opacity: 0,
        duration: 500,
        display: false,
        easing: 'easeInExpo',
        complete: function(anim) {
            document.querySelector('form.login').style.display = 'none';
            document.querySelector('form.register').style = `
                opacity: 0;
                display: block;
                left: 100%;
            `
            anime({
                targets: 'form.register',
                opacity: 1,
                left: '0%',
                duration: 200,
                display: false,
                easing: 'linear',
                complete: function(anim) {
                    loginContainer.style.overflow = 'unset';
                    askForResize();
                }
              });
          }
      });
})

buttonLogin.addEventListener('click', () => {
    buttonLogin.classList.add('active');
    buttonRegister.classList.remove('active');

    // para que las animaciones se muestren correctamente fue necesario que al inicio el contenedor
    // tenga como propiedad overflow:hidden ya que al no hacerlo de esta manera los botones no se muestran en la pantall
    loginContainer.style.overflow = 'hidden';

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
            anime({
                targets: 'form.login',
                opacity: 1,
                left: '0%',
                duration: 200,
                display: false,
                easing: 'linear',
                complete: function(anim) {
                    loginContainer.style.overflow = 'unset';
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
    if(window.innerWidth <= 768) {
        resizeElements();
    } else if(window.innerWidth > 768) {
        undoResizeElements();
    }
}

function resizeElements() {
    // cuando el height del documento sea mayor al tamaño de la pantalla
    // se tiene que hacer la siguiente configuración para que el contenedor pueda 
    // mostar todos los botones e inputs correctamente, además de las animaciones
    if(document.documentElement.scrollHeight > window.screen.height){
        loginContainer.style = `
            top: ${window.innerHeight - welcome.offsetHeight}px;
            height: inherit;
        `
        loginContainer.firstElementChild.style.height = '100%';
    } else {
        // y cuando sea menor el contenedor tiene que también tener el tamaño correcto para poder mostrar los elementos que contiene
        loginContainer.style = `
            top: ${window.innerHeight - welcome.offsetHeight}px;
            height: ${document.documentElement.scrollHeight - welcome.offsetHeight}px;
        `
        loginContainer.firstElementChild.style.height = '100%';
    }
}

function undoResizeElements() {
    loginContainer.style = `
        top: 0;
        height: 100%;
    `
    loginContainer.firstElementChild.style.height = 'unset';
}