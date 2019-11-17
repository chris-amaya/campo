import '../css/global.css';
import './global';
import '../css/list-products.css';

const urlCategory = window.location.href.split('/').length == 5 ? window.location.href.split('/').slice(-1)[0] : window.location.href.split('/')[4];
const page = window.location.href.split('/').length == 6 ? window.location.href.split('/').slice(-1)[0] : 1;
// document.title = `${window.location.href.split('/').slice(-1)[0]}`
const containerProducts = document.getElementById('container-products');
document.addEventListener('DOMContentLoaded', (e) => DOMContentLoaded(e), false);

async function DOMContentLoaded() {
    document.title = `${window.location.href.split('/').slice(-1)[0]} | productos`
    let productsReq = await fetch(`/api/category/${urlCategory}/${page}`);
    let productsRes = await productsReq.json();
    console.log(productsRes)
    renderProducts(productsRes);
    renderPagination(productsRes.pages > 0 ? productsRes.pages : 0, Number(page));
}

const paginationContainer = document.getElementById('pagination');

function renderPagination(pages, currentPage) {
    console.log(pages);
    console.log(currentPage);
    if(pages == 1) {
        paginationContainer.style.display = 'none';
    } else {
        if(currentPage > 1) {
            paginationContainer.innerHTML = `
            <a href='categoria/${urlCategory}/${currentPage - 1}' class="before">
            <i class="fas fa-chevron-left"></i>
            </a>
            `
        }
        for(let i = currentPage; i < pages; i++) {
            if(pages == currentPage) {
                paginationContainer.innerHTML += `
                <a class='active' href='categoria/${urlCategory}/${i + 1}'>${i + 1}</a>
            `
            } else {
                paginationContainer.innerHTML += `
                    <a href='categoria/${urlCategory}/${i + 1}'>${i + 1}</a>
                `
            }

            if(i == currentPage + 1) i = pages;
        }
        if(currentPage != pages) {
            paginationContainer.innerHTML += `
            <a href='categoria/${urlCategory}/${currentPage + 1}' class="next">
                <i class="fas fa-chevron-right"></i>
            </a>
            `

        }
    }
}

async function renderProducts(data) {


    if(data.productsDB) {
        for(let i = 0; i < data.productsDB.length; i++) {
            containerProducts.innerHTML += `
            <a class="list-product" href='/producto/${data.productsDB[i].url}'>
                <figure>
                    <img src='${data.productsDB[i].mainImg}' alt="">
                    <p class="prize">${data.productsDB[i].prize}</p>
                </figure>
                <div class="info-product">
                    <h3 class="title-product">${data.productsDB[i].title}</h3>
                    <p class="desc-product">${data.productsDB[i].description}</p>
                    <div class="detail-product">
                        <p class="location-product">${data.productsDB[i].userInfo.location || 'Desconocido'}</p>
                        <p class="author-product">${data.productsDB[i].userInfo.firstName} ${data.productsDB[i].userInfo.lastName}</p>
                    </div>
                </div>
            </a>
            
            `

        }
    }

}

