import '../css/dashboard.css';
import './dashboard'
import '../css/user.css'
import '../css/dashboard.create-product.css'

let imgMainSelec = '';
let errors = [];
const id = window.location.href.split('/').slice(-1)[0];
const titleProduct = document.getElementById('title-product');
const descProduct  = document.getElementById('desc-product');
const prizeProduct = document.getElementById('prize-product');
const category     = document.getElementById('category');
const buttonEdit = document.getElementById('button-editProduct');
const messageErrorBox = document.getElementById('messageErrorBox');

buttonEdit.addEventListener('click', (e) => upgradeProduct(e), false);

async function upgradeProduct(e) {
    e.preventDefault();
    validateForm();

    if(errors.length == 0) {
        messageErrorBox.style.display = 'none';
        const body = {
            title: titleProduct.value,
            description: descProduct.value,
            prize: prizeProduct.value,
            category: category.value,
            mainImg: null,
            userInfo: {
                firstName: localStorage.getItem('firstName') || sessionStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName') || sessionStorage.getItem('lastName'),
                email: localStorage.getItem('email') || sessionStorage.getItem('email'),
            },
            pics: []
        };

        let pics = document.querySelectorAll('[data-img]');
        if(pics.length > 0) {
            for(let i = 0; i < pics.length; i++) {
                body.pics.push(pics[i].dataset.img);
            }
        } 

        // limpiar array de valores duplicados
        body.pics = [...new Set(body.pics)];
        // registrar la foto que el usuario quiere como principal
        body.mainImg = body.pics.findIndex((pic) => {
            return pic == imgMainSelec
        })
        console.log(body);

        let productReq = await fetch(`api/product/edit-product/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                title: body.title,
                description: body.description,
                category: body.category,
                prize: body.prize,
                mainImg: body.mainImg,
                userInfo: body.userInfo,
                pics: body.pics,
                userStored: {
                    email: localStorage.getItem('email') || sessionStorage.getItem('email')
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });
        let productRes = await productReq.json();
        console.log(productRes);

        if(productRes.status == 'ok') {
            window.location.href = '/dashboard/productos'
        } else {
            messageErrorBox.style.display = 'flex';
            messageErrorBox.innerHTML = `<li>${productRes.msg}</li>`;
        }
    } else if (errors.length > 0){
        messageErrorBox.style.display = 'flex';
        messageErrorBox.innerHTML = '';
        for(let i = 0; i < errors.length; i++) {
            messageErrorBox.innerHTML += `
                <li>${errors[i]}</li>
            `
        }
        errors = []
    }
}

document.addEventListener('DOMContentLoaded', (e) => fetchFormData(e), false);

async function fetchFormData(e) {
    let reqFormData = await fetch(`/api/product/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || sessionStorage.getItem('token')
        }
    })
    let resFormData = await reqFormData.json();
    if(resFormData.status == 'ok') {
        let product = resFormData.productDB;
        titleProduct.value = product.title;
        descProduct.value = product.description;
        prizeProduct.value = product.prize;
        category.value = product.category;

        if(product.pics.length > 0) {
            for(let i = 0; i < product.pics.length; i++) {
                document.getElementById('photos').innerHTML += `
                <div class='pic'> 
                    <figure>
                        <img src='${product.pics[i]}' data-img='${product.pics[i]}'/>
                    </figure>
                    <i id="delete-img" class="fas fa-times"></i>
                    <i id="main-img" class="fas fa-star"></i>
                </div>
            `
            }

        } else {
            console.log('no hay fotos')
        }
    }

}

document.addEventListener('click', (e) => documentMethod(e), false);
async function documentMethod(e) {
    if(e.target.id == 'delete-img') {
        // e.target.parentElement.remove();
        imgMainSelec = '';
        let id = e.target.parentElement.children[0].firstElementChild.dataset.img.split('/').slice(-1)[0];
        if(confirm('Seguro que desea borrar esta imagen')) {

            if(await deleteIMG(id)) {
                e.target.parentElement.remove();
            } 
        }
    } 
    if(e.target.id == 'main-img') {
        imgMainSelec = e.target.parentElement.children[0].firstElementChild.dataset.img;
        e.target.classList.add('img-selected');
        resetSelectedImg();
        e.target.classList.add('img-selected');
    }
}

async function deleteIMG(img) {
    let reqPic = await fetch(`/api/product/delete-img/${img}`, {
        body: JSON.stringify({
            userStored: {
                email: localStorage.getItem('email') || sessionStorage.getItem('email')
            },
            idProduct: id
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || sessionStorage.getItem('token')
        }
    })

    let resPic = await reqPic.json();

    if(resPic.status == 'ok') {
        return true 
    } else {
        return undefined
    }
    
}


function validateForm() {
    // if(titleProduct.value == '' || titleProduct.value === undefined || titleProduct.value.length < 0) {
    //     errors.push('favor de insertar un titulo')
    // }

    // if(descProduct.value == '' || descProduct.value === undefined || descProduct.value.length < 0 || descProduct.value.length >= 1000) {
    //     errors.push('favor de insertar una descripción, no mayor a 1000 caracteres');
    // }

    // if(prizeProduct.value == '' || prizeProduct.value === undefined || prizeProduct.value.length < 0) {
    //     errors.push('favor de insertar un precio')
    // }

    // if(category.value == '' || category.value === undefined || category.value.length < 0) {
    //     errors.push('favor de seleccionar una categoria')
    // }

    if(document.querySelectorAll('[data-img]').length == 1 ) {
        imgMainSelec = document.querySelector('[data-img]').src;
    } else if(imgMainSelec == '' || imgMainSelec == undefined || imgMainSelec == null){
        errors.push('favor de seleccionar una imagen como principal del producto')
    }
}

function resetSelectedImg() {
    let selections = document.querySelectorAll('i.img-selected');
    for(let i = 0; i < selections.length; i++ ) {
        selections[i].classList.remove('img-selected');
    } 
}

function renderImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        let urlFile = event.target.result;
        document.getElementById('photos').innerHTML += `
            <div class='pic'> 
                <figure>
                    <img src='${urlFile}' data-img='${urlFile}'/>
                </figure>
                <i id="delete-img" class="fas fa-times"></i>
                <i id="main-img" class="fas fa-star"></i>
            </div>
        `
    }

    reader.readAsDataURL(file);
}

const inputPic = document.getElementById('photos-product');
inputPic.addEventListener('change', (e) => {
    for(let i = 0; i < inputPic.files.length; i++) {
        renderImage(inputPic.files[i]);
    }
})