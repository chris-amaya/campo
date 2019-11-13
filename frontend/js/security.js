import '../css/dashboard.css';
import './dashboard.js'
import '../css/user.css'
import '../css/security.css';

const currentPassword = document.getElementById('currentPassword');
const newPassoword    = document.getElementById('newPassword');
const newPassword2   = document.getElementById('newPassword2');
const buttonUpdate    = document.getElementById('buttonUpdate');
const messageErrorBox = document.getElementById('messageErrorBox')

buttonUpdate.addEventListener('click', (e) => updatePass(e), false);

async function updatePass(e) {
    e.preventDefault();

    validateForm();
    messageErrorBox.style.display = 'none'

    const body = {
        currentPassword: currentPassword.value,
        newPassword: newPassoword.value,
        newPassword2: newPassword2.value,
        _id: sessionStorage.getItem('_id') || localStorage.getItem('_id')
    }

    console.log(body)

    if(errors.length > 0) {
        renderErrors(errors);
    } else if(errors.length == 0) {
        let passReq = await fetch('/api/user/update-password', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });
        let passRes = await passReq.json();
        if(passRes.status == 'ok') {
            window.location.href = '/dashboard'
        } else {
            alert(passRes.msg)
        }
    }

}

let errors = []

function validateForm(){
    errors = [];
    if(currentPassword.value == '') {
        errors.push('favor de ingresar la contraseña usada actualmente')
    }
    
    if(newPassword.value == '') {
        errors.push('favor de ingresar la nueva contraseña')
    }

    if(newPassword.value != newPassword2.value ) {
        errors.push('las nuevas contraseñas no son iguales')
    }
}

function renderErrors(errors){
    messageErrorBox.innerHTML = ''
    messageErrorBox.style.display = 'flex'
    errors.forEach(error => {
        messageErrorBox.innerHTML += `
            <li>${error}</li>
        `
    });
}