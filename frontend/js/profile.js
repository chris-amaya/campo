import '../css/global.css'
import './global';
import '../css/profile.css'

const urlUser = window.location.href.split('/').slice(-1)[0];

document.addEventListener('DOMContentLoaded', (e) => DOMContentLoaded(), false)

async function DOMContentLoaded(e) {
    let userReq = await fetch(`/api/user/profile/${urlUser}`);
    let userRes = await userReq.json();
    renderData(userRes)
}

async function renderData(data) {
    console.log(data);
    document.getElementById('user-name').textContent = `${data.userDB.firstName} ${data.userDB.lastName}`
    document.getElementById('user-pic').src = data.userDB.pic
    document.getElementById('number-counter-opinions').textContent = data.userDB.opinions || '0'
    document.getElementById('user-opinions').textContent = data.userDB.opinions || '0'
    document.getElementById('city').textContent = data.userDB.city || 'No especificado'
    document.getElementById('state').textContent = data.userDB.state || 'No especificado'; 
    document.getElementById('cp').textContent = data.userDB.cp || 'No especificado';

    // // TODO: Si el token de inicio de sesión es valido mostrar la siguiente información de lo contrario sólo ocultarlo
    if(sessionStorage.getItem('token') || localStorage.getItem('token')) {
        let tokenReq = await fetch('/api/user/check-token', {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        })
        let tokenRes = await tokenReq.json();
        console.log(tokenRes);
        if(tokenRes.status == 'ok') {
            document.getElementById('address').textContent = data.userDB.address || 'No especificado'
            document.getElementById('email').textContent = data.userDB.email 
            document.getElementById('phone').textContent = data.userDB.phone || 'No especificado'
        }
    } else {
        document.getElementById('address').textContent = 'Inicia sesión o registrate para ver este dato'
        document.getElementById('email').textContent = 'Inicia sesión o registrate para ver este dato'
        document.getElementById('phone').textContent = 'Inicia sesión o registrate para ver este dato'
    }

    if(data.productsDB) {
        let conteiner = document.getElementById('container-products');
        for(let i = 0; i < data.productsDB.length; i++) {
            

            conteiner.innerHTML += `
            <a href='/producto/${data.productsDB[i].url}'>
                <figure>
                    <img src='${data.productsDB[i].mainImg}'>
                    <p class='prize'>${data.productsDB[i].prize}</p>
                </figure>
            </a>
            `
        }
    }

    
}