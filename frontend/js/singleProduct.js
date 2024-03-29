import '../css/global.css'
import '../css/list-products.css';
import './global';
import '../css/singleProduct.css';
import { ImageProduct } from './classes/image';
import { animations } from './animations';

const urlProduct = window.location.href.split('/').slice(-1)[0];
// const buyButton = document.getElementById('buy');

// buyButton.addEventListener('click', (e) => getContactDataUser(e), false);

async function getContactDataUser(e) {
    let userReq = await fetch(`api/user/product/${urlProduct}`, {
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || sessionStorage.getItem('token')
        }
    });
    let userRes = await userReq.json();
    console.log(userRes);
}

document.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    // console.log(e.target);
    if(e.target.id == 'next') {
        const imageProduct = new ImageProduct(document.querySelector('img.active'));        
        animations.hideModalToLeft(document.querySelector('img.active'));
        animations.bringFromRight(imageProduct.nextActive());
    }

    if(e.target.id == 'back') {
        const imageProduct = new ImageProduct(document.querySelector('img.active'));
        animations.hideModalToRight(document.querySelector('img.active'));
        animations.bringFromLeft(imageProduct.backActive());
    }

    if(e.target.dataset.id) {
        const imageProduct = new ImageProduct(document.querySelector('img.active'));
        document.querySelector('img.active').classList.remove('active')
        imageProduct.getImageSelectedId(e.target.dataset.id).classList.add('active');
        imageProduct.getImageSelectedId(e.target.dataset.id).style.left = '0%';

    }

    if(e.target.id == 'buy' || e.target.parentElement.id == 'buy') {
        
        animations.bringFromTop(document.getElementById('buy-modal'))
    }

    if(e.target.id == 'close-buy-modal' || e.target.parentElement.id == 'close-buy-modal') {
        animations.hideToTop(document.getElementById('buy-modal'))
    }
})


document.addEventListener('DOMContentLoaded', (e) => fetchProduct(e), false)

async function fetchProduct(e){
    let productReq = await fetch(`api/product/${urlProduct}`);
    let productRes = await productReq.json();
    renderizarDatos(productRes.productDB);
    renderUserData(productRes.userInfo);
    document.title = productRes.productDB.title;
    // await ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'));
}

function renderizarDatos(product) {
    document.getElementById('url-product').href = `/producto${product.url}`;
    document.getElementById('url-product').textContent = product.title;
    document.getElementById('title').textContent = product.title;

    for(let i = 0; i < product.pics.length; i++ ) {
        if(i == 0) {
            document.getElementById('pics-prod').innerHTML += `
            <img src='${product.pics[i]}' class='active'>
            `
        } else {
            document.getElementById('pics-prod').innerHTML += `
            <img src='${product.pics[i]}'>
            `
        }
        document.getElementById('counter').innerHTML += `<i class='fas fa-circle' data-id=${i + 1}></i>`;
    }
    document.getElementById('title-prod').textContent = product.title;
    document.getElementById('desc-prod').textContent = product.description;
    // ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'))
}

function renderUserData(user) {
    document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('user-name').href = `/perfil/${user.url}`
    document.getElementById('user-location').textContent = `${user.address.city}, ${user.address.state}` || 'Ubicación no dada por el usuario'
}

window.addEventListener('load', (e) => {
    ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'));
})

window.addEventListener('resize', (e) => {
    ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'));
});


