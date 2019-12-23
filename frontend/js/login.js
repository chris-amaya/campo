import '../css/global.css'
import './global';
import '../css/login.css'
import { animations } from './animations';
import anime from 'animejs/lib/anime.es.js';

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    const token = googleUser.getAuthResponse().id_token;

    let googleReq = await fetch(`/google-verify`, {
        method: 'POST',
        body: JSON.stringify({
            token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let googleRes = await googleReq.json();
    console.log(googleRes)


    if(googleRes.userDB != undefined) {
        // setear sessiones
        sessionStorage.setItem('googleUser', JSON.stringify(googleRes.userDB));
        sessionStorage.setItem('token', JSON.stringify(googleRes.token));

        sessionStorage.setItem('googleToken', JSON.stringify(token));
        sessionStorage.setItem('token',     googleRes.token)
        sessionStorage.setItem('firstName', googleRes.userDB.name)
        sessionStorage.setItem('lastName',  '')
        sessionStorage.setItem('email',     googleRes.userDB.email)
        sessionStorage.setItem('_id',       googleRes.userDB._id)
        sessionStorage.setItem('role',      googleRes.userDB.role)
        sessionStorage.setItem('pic',       googleRes.userDB.pic)
        sessionStorage.setItem('url',       googleRes.userDB.url)

        window.location.href = '/dashboard/user';
    } else {
        // usuario aún no se ha registrado
        if(googleRes.ok == true || googleRes.ok == 'ok') {
            // setear sessiones
            sessionStorage.setItem('googleUser', JSON.stringify(googleRes.userDB))
            changeForm('account-options', 'register');
            changeForm('account-options', 'login');
        }
    }
    


}




import { User } from './classes/user';
import { model } from 'mongoose';

const loginContainer = document.getElementById('loginContainer')
const welcome        = document.getElementById('welcome');
const buttonLogin    = document.getElementById('buttonLogin');
const buttonRegister = document.getElementById('buttonRegister');

buttonRegister.addEventListener('click', () => {
    buttonRegister.classList.add('active');
    buttonLogin.classList.remove('active')
    changeForm('register', 'login');
})

buttonLogin.addEventListener('click', () => {
    buttonLogin.classList.add('active');
    buttonRegister.classList.remove('active');
    changeForm('login', 'register');
})

// ============================================================================================== //
// ==================================== REGISTRO DE USUARIOS ==================================== //
// ============================================================================================== //

const firstName        = document.getElementById('signUpFullName');
const lastName        = document.getElementById('signUpLastName');
const email           = document.getElementById('signUpEmail');
const password        = document.getElementById('signUpPassword');
const password2       = document.getElementById('signUpPassword2');
const buttonSignUp    = document.getElementById('buttonSignUp');
const messageErrorBox = document.getElementById('messageErrorBox');
const privacy         = document.getElementById('checkPrivacy');  
const conditions      = document.getElementById('checkConditions');
var role;

let user = new User();

// Tuve que hacer uso de una función handler para poder usar async/await
buttonSignUp.addEventListener('click', (event) => handlerSignUp(event), false);

async function handlerSignUp(event) {
    event.preventDefault();
    const result = user.init(email.value, password.value, password2.value, firstName.value, lastName.value, conditions.checked, privacy.checked); 

    
    if(result === true) {
       // TODO: hacer fetch hacía el servidor y pasar a la siguiente animación 
        let emailReq = await fetch(`/api/user/email/${email.value}`)
        let emailExists = await emailReq.json(); 
        if(emailExists.status === true) {
            // cambiar a la siguiente animación
            messageErrorBox.style.display = 'none';
            changeForm('account-options', 'register');
        } else {
            messageErrorBox.style.display = 'flex';
            messageErrorBox.innerHTML = '';
            messageErrorBox.innerHTML += `<li>${emailExists.msg}</li>`
        }

    } else {
        // mostrar mensajes de error en la pantalla del usuario
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = '';
        for(let i = 0; i < result.length; i++) {
            messageErrorBox.innerHTML += `
                <li>${result[i]}</li>
            `
        }
    }
}

// botones en los que se muestra la información complementaria para el usuario
const buttonAccountOption1 = document.getElementById('account-options1');
const buttonAccountOption2 = document.getElementById('account-options2')

buttonAccountOption1.addEventListener('click', (e) => handlerButtonAccountOption1(e), false);
buttonAccountOption2.addEventListener('click', (e) => handlerButtonAccountOption2(e), false);



// formulario donde se muestra en que sí el usuario usara la cuenta como vendedor o comprado
async function handlerButtonAccountOption1(e) {
    e.preventDefault();
    if(!role || role.length == 0 || role == '' || role == null, role === undefined) {
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = `<li>favor de seleccionar una opción</li>`
    } else if(role == 'sell') {
        messageErrorBox.style.display = 'none';
        changeForm('account-options-2', 'account-options');
    } else {
        // hacer fetch registrando al usuario como comprador
        messageErrorBox.style.display = 'none';

        let googleUser = sessionStorage.getItem('googleUser');
        if(googleUser) {
            googleUser = JSON.parse(googleUser);
            googleSignUp(googleUser);
            // fetchRegisterUser(googleUser.name, null, null, googleUser.email, role);
        } else {
            fetchRegisterUser(firstName.value, lastName.value, password.value, email.value, role)
        }

    }
}

// formulario donde se muestra que si el usuario usará la cuenta de vendedor como usuario único o pertenece a un ejido o grupo
async function handlerButtonAccountOption2(e) {
    e.preventDefault();
    if(!role || role.length == 0 || role == '' || role == null, role === undefined) {
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = `<li>favor de seleccionar una opción</li>`
    } else if(role == 'SELLER_TEAM_ROLE' || role == 'SELLER_ALONE_ROLE') {
        messageErrorBox.style.display = 'none';


        let googleUser = sessionStorage.getItem('googleUser');
        if(googleUser) {
            googleUser = JSON.parse(googleUser);
            googleSignUp(googleUser);
            // fetchRegisterUser(googleUser.name, null, null, googleUser.email, role);
        } else {
            fetchRegisterUser(firstName.value, lastName.value, password.value, email.value, role)
        }
        // if(googleUser)
        // hacer fetch de registro usuario como vendedor y redireccionar hacía el dashboard
        // fetchRegisterUser(firstName.value, lastName.value, password.value, email.value, role);
    }

}

// ============================================================================================== //
// ====================================== LOGIN DE USUARIOS ===================================== //
// ============================================================================================== //

const loginButton   = document.getElementById('submitLogin');
const emailLogin    = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('passwordLogin');
const remember      = document.getElementById('checkboxRemember')

loginButton.addEventListener('click', (event) => handlerLogin(event), false);

async function handlerLogin(event) {
    event.preventDefault();

    if(!emailLogin.value || emailLogin.value == '') {
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = `<li>Favor de ingresar su email</li>`
    } else if (!passwordLogin.value || passwordLogin.value == '') {
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = `<li>Favor de ingresar su contraseña</li>`
    } else {
        let loginReq = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: emailLogin.value,
                password: passwordLogin.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let response = await loginReq.json();
        console.log(response);
        if(response.status == 'ok') {
            // TODO: redirigir a /dashboard
            // TODO: guardar data en localstorage
            if(remember.checked === true) {
                localStorage.setItem('token',     response.token);
                localStorage.setItem('firstName', response.userDB.firstName);
                localStorage.setItem('lastName',  response.userDB.lastName);
                localStorage.setItem('email',     response.userDB.email);
                localStorage.setItem('_id',       response.userDB._id);
                localStorage.setItem('role',      response.userDB.role);
                localStorage.setItem('pic',       response.userDB.pic)
                localStorage.setItem('url',       response.userDB.url);
            } else {
                sessionStorage.setItem('token', response.token)
                sessionStorage.setItem('firstName', response.userDB.firstName)
                sessionStorage.setItem('lastName', response.userDB.lastName)
                sessionStorage.setItem('email', response.userDB.email)
                sessionStorage.setItem('_id', response.userDB._id)
                sessionStorage.setItem('role', response.userDB.role)
                sessionStorage.setItem('pic', response.userDB.pic)
                sessionStorage.setItem('url', response.userDB.url)
                
            }
            window.location.href = '/dashboard';
        } else {
            messageErrorBox.style.display = 'flex';
            messageErrorBox.innerHTML = `<li>${response.msg}</li>`
        }
    }

}

document.addEventListener('click', (e) => {
    handlerOptionAccount(e.target);
});


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

// función usada para veríficar que las opciones son escogidas y establecidas correctamente
function handlerOptionAccount(option) {
    if(option.classList.contains('optionBuy') || option.parentElement.classList.contains('optionBuy')) {
        role = 'BUYER_ROLE';
        handlerOptionSelected('form.account-options .options div', 0);
    } else if( option.classList.contains('optionSell') || option.parentElement.classList.contains('optionSell')) {
        role = 'sell';
        handlerOptionSelected('form.account-options .options div', 1);
    }

    if(option.classList.contains('optionTeam') || option.parentElement.classList.contains('optionTeam')) {
        role = 'SELLER_TEAM_ROLE';
        handlerOptionSelected('form.account-options-2 .options div', 1)
    } else if(option.classList.contains('optionUser') || option.parentElement.classList.contains('optionUser')) {
        role = 'SELLER_ALONE_ROLE'
        handlerOptionSelected('form.account-options-2 .options div', 0)
    }
}

// functión que cambia en pantalla la opción que ha sido escogida
function handlerOptionSelected(selector, numberOption) {
    const options = document.querySelectorAll(selector);
    if(numberOption === 0) {
        options[0].classList.add('option-selected');
        options[1].classList.remove('option-selected');
    } else if(numberOption === 1) {
        options[1].classList.add('option-selected');
        options[0].classList.remove('option-selected');
    }
}

async function googleSignUp(user) {
    const params = {
        firstName: user.name,
        lastName: null,
        password: null,
        email: user.email,
        role,
        token: JSON.parse(sessionStorage.getItem('googleToken'))
    }

    const reqRegisterUser = await fetch(`/google`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await reqRegisterUser.json();
    console.log(response);
    if(response.status == 'ok' || response.ok == true) {
        // TODO: inicializar parametros localstorage y redirigir al dashboard
        if(remember.value === true) {
            localStorage.setItem('token',     response.token);
            localStorage.setItem('firstName', response.user.name);
            localStorage.setItem('lastName',  '');
            localStorage.setItem('email',     response.user.email);
            localStorage.setItem('_id',       response.user._id);
            localStorage.setItem('role',      response.user.role)
            localStorage.setItem('pic',       response.user.pic);
            localStorage.setItem('url',       response.user.url);
        } else {
            sessionStorage.setItem('token',     response.token)
            sessionStorage.setItem('firstName', response.user.name)
            sessionStorage.setItem('lastName',  '')
            sessionStorage.setItem('email',     response.user.email)
            sessionStorage.setItem('_id',       response.user._id)
            sessionStorage.setItem('role',      response.user.role)
            sessionStorage.setItem('pic',       response.user.pic)
            sessionStorage.setItem('url',       response.user.url)
        }
        if(response.user.role == 'BUYER_ROLE') {
            window.location.href = '/'
        } else {
            window.location.href = '/dashboard/user'
        }


    } else if(response.status == false) {
        // TODO: mostrar errores en pantalla
        // @param response.message - mensaje que contiene el error que ha ocurrido
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = `<li>${response.message}</li>`
    }


}

async function fetchRegisterUser(firstName, lastName, password, email, role) {
    const params = {
        firstName,
        lastName,
        password,
        email,
        role
    }
    const registerUser = await fetch('api/user/signUp/', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    const response = await registerUser.json();
    console.log(response)
    if(response.status == 'ok') {
        // TODO: inicializar parametros localstorage y redirigir al dashboard
        if(remember.value === true) {
            localStorage.setItem('token',     response.token);
            localStorage.setItem('firstName', response.user.firstName);
            localStorage.setItem('lastName',  response.user.lastName);
            localStorage.setItem('email',     response.user.email);
            localStorage.setItem('_id',       response.user._id);
            localStorage.setItem('role',      response.user.role)
            localStorage.setItem('pic',       response.user.pic);
            localStorage.setItem('url',       response.user.url);
        } else {
            sessionStorage.setItem('token',     response.token)
            sessionStorage.setItem('firstName', response.user.firstName)
            sessionStorage.setItem('lastName',  response.user.lastName)
            sessionStorage.setItem('email',     response.user.email)
            sessionStorage.setItem('_id',       response.user._id)
            sessionStorage.setItem('role',      response.user.role)
            sessionStorage.setItem('pic',       response.user.pic)
            sessionStorage.setItem('url',       response.user.url)
        }
        if(response.user.role == 'BUYER_ROLE') {
            window.location.href = '/'
        } else {
            window.location.href = '/dashboard/user'
        }


    } else if(response.status == false) {
        // TODO: mostrar errores en pantalla
        // @param response.message - mensaje que contiene el error que ha ocurrido
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = `<li>${response.message}</li>`
    }
}


function changeForm(bringForm, hideForm) {
    // para que las animaciones se muestren correctamente fue necesario que al inicio el contenedor
    // tenga como propiedad overflow:hidden ya que al no hacerlo de esta manera los botones no se muestran en la pantalla
    loginContainer.style.overflow = 'hidden';
    anime({
        targets: `form.${hideForm}`,
        opacity: 0,
        duration: 500,
        display: false,
        easing: 'easeInExpo',
        complete: function(anim) {
            document.querySelector(`form.${hideForm}`).style.display = 'none';
            document.querySelector(`form.${bringForm}`).style = `
                opacity: 0;
                display: block;
                left: 100%;
            `
            anime({
                targets: `form.${bringForm}`,
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
}

window.onSignIn = onSignIn;