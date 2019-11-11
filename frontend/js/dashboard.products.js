import '../css/dashboard.css';
import './dashboard.js'
import '../css/dashboard.products.css'

const productsTable = document.getElementById('products-table')

document.addEventListener('DOMContentLoaded', (e) => getProductsUser(e), false);

async function getProductsUser(e) {
    let productsReq = await fetch('/api/products', {
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
    if(productsRes.length > 0) {
        productsTable.innerHTML = `
        <div class="title">
            <h3>Titulo</h3>
        </div>
        <div class="Desc">
            <h3>Descripción</h3>
        </div>
        `
        for(let i = 0; i < productsRes.length; i++) {
            productsTable.innerHTML += `
            <div class="product">
                <p class="title-product">${productsRes[i].title}</p>
                <p class="desc-product">${productsRes[i].description}</p>
                <div class="controls">
                        <a class="edit" href='/dashboard/producto/editar/${productsRes[i]._id}'>
                            <i class="fas fa-pen"></i>
                        </a>
                        <div class="see-more">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="more-options">
                            <i class="fas fa-ellipsis-h highlight"></i>
                        </div>
                    </div>
            </div>
            `
        }

    } else {
        productsTable.innerHTML = `<p>Actualmente no ha creado ningún producto para su venta</p>`
    }
    

}