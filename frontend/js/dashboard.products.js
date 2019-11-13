import '../css/dashboard.css';
import './dashboard.js'
import '../css/dashboard.products.css'
import '../css/global.css'

const urlCategory = window.location.href.split('/').length == 5 ? window.location.href.split('/').slice(-1)[0] : window.location.href.split('/')[4];
const page = window.location.href.split('/').length == 6 ? window.location.href.split('/').slice(-1)[0] : 1;

const productsTable = document.getElementById('products-table')

document.addEventListener('DOMContentLoaded', (e) => getProductsUser(e), false);

async function getProductsUser(e) {
    let productsReq = await fetch(`/api/products/${page}`, {
        method: 'POST',
        body: JSON.stringify({
            userStored: {
                email: localStorage.getItem('email') || sessionStorage.getItem('email')
            }
            // userLocalStorate: {
            //     email: localStorage.getItem('email') || sessionStorage.getItem('email')
            // }
        }),
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || sessionStorage.getItem('token')
        }
    });
    let productsRes = await productsReq.json();
    console.log(productsRes);
    if(productsRes.productsDB.length > 0) {
        productsTable.innerHTML = `
        <div class="title">
            <h3>Titulo</h3>
        </div>
        <div class="Desc">
            <h3>Descripción</h3>
        </div>
        `
        for(let i = 0; i < productsRes.productsDB.length; i++) {
            productsTable.innerHTML += `
            <div class="product">
                <p class="title-product">${productsRes.productsDB[i].title}</p>
                <p class="desc-product">${productsRes.productsDB[i].description}</p>
                <div class="controls">
                        <a class="edit" href='/dashboard/producto/editar/${productsRes.productsDB[i]._id}'>
                            <i class="fas fa-pen"></i>
                        </a>
                        <a class="see-more" href='/producto/${productsRes.productsDB[i].url}'>
                            <i class="fas fa-eye"></i>
                        </a>
                        <div class="more-options">
                            <i class="fas fa-ellipsis-h highlight"></i>
                        </div>
                    </div>
            </div>
            `
        }
        renderPagination(productsRes.pages > 0 ? productsRes.pages : 0, Number(page))

    } else {
        productsTable.innerHTML = `<p>Actualmente no ha creado ningún producto para su venta</p>`
    }

    

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
            <a href='/dashboard/${urlCategory}/${currentPage - 1}' class="before">
            <i class="fas fa-chevron-left"></i>
            </a>
            `
        }
        for(let i = currentPage; i < pages; i++) {
            if(pages == currentPage) {
                paginationContainer.innerHTML += `
                <a class='active' href='/dashboard/${urlCategory}/${i + 1}'>${i + 1}</a>
            `
            } else {
                paginationContainer.innerHTML += `
                    <a href='/dashboard/${urlCategory}/${i + 1}'>${i + 1}</a>
                `
            }

            if(i == currentPage + 1) i = pages;
        }
        if(currentPage != pages) {
            paginationContainer.innerHTML += `
            <a href='/dashboard/${urlCategory}/${currentPage + 1}' class="next">
                <i class="fas fa-chevron-right"></i>
            </a>
            `

        }
    }
}