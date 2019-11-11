import '../css/global.css'
import '../css/index.css';
import '../css/list-products.css';
import './global';

const containerLastProducts = document.getElementById('container-last-products')

document.addEventListener('DOMContentLoaded', (e) => DOMContentLoaded(e), false);

async function DOMContentLoaded(e) {
    let lastProductsReq = await fetch(`/api/product/last-products`);
    let lastProductsRes = await lastProductsReq.json();
    renderLastProducts(lastProductsRes)
}

function renderLastProducts(data) {
    console.log(data);
    if(data.lastProductsDB) {
        for(let i = 0; i < data.lastProductsDB.length; i++) {
            containerLastProducts.innerHTML += `
            <a class="list-product" href='/producto/${data.lastProductsDB[i].url}'>
                <figure>
                    <img src='${data.lastProductsDB[i].mainImg}' alt="">
                    <p class='prize'>${data.lastProductsDB[i].prize} MXN</p>
                </figure>
                <div class="info-product">
                    <h3 class="title-product">${data.lastProductsDB[i].title}</h3>
                    <p class="desc-product">${data.lastProductsDB[i].description}</p>
                    <div class="detail-product">
                        <p class="location-product">${data.lastProductsDB[i].userInfo.city || 'locación desconocida'}</p>
                        <p class="author-product">${data.lastProductsDB[i].userInfo.firstName} ${data.lastProductsDB[i].userInfo.lastName}</p>
                    </div>
                </div>
            </a>
            `
        } 
    }

}

