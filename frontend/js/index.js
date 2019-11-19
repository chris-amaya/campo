import '../css/global.css'
import '../css/index.css';
import '../css/list-products.css';
import './global';

const containerLastProducts = document.getElementById('container-last-products')

document.addEventListener('DOMContentLoaded', (e) => DOMContentLoaded(e), false);

async function DOMContentLoaded(e) {
    let lastProductsReq = await fetch(`/api/product/last-products`);
    let lastProductsRes = await lastProductsReq.json();
    renderLastProducts(lastProductsRes.newProducts)
}

function renderLastProducts(data) {
    console.log(data);
    if(data.length > 0) {
        for(let i = 0; i < data.length; i++) {
            let userInfo = data[i].user;
            let product = data[i].product;
            containerLastProducts.innerHTML += `
            <a class="list-product" href='/producto/${product.url}'>
                <figure>
                    <img src='${product.mainImg}' alt="">
                    <p class='prize'>${product.prize} MXN</p>
                </figure>
                <div class="info-product">
                    <h3 class="title-product">${product.title}</h3>
                    <p class="desc-product">${product.description}</p>
                    <div class="detail-product">
                        <p class="location-product">${userInfo.address.city + ' ' + userInfo.address.state || 'locación desconocida'}</p>
                        <p class="author-product">${userInfo.firstName} ${userInfo.lastName}</p>
                    </div>
                </div>
            </a>
            `
        } 
    }

}

