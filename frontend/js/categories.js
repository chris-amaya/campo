import '../css/global.css';
import './global';
import '../css/categories.css'

const categoriesContainer = document.getElementById('container-categories')
document.addEventListener('DOMContentLoaded', (e) => DOMContentLoaded(e), false)
async function DOMContentLoaded(e) {
    let categoriesReq = await fetch('api/categories');
    let categoriesRes = await categoriesReq.json();
    
    renderCategories(categoriesRes);
}

function renderCategories(data) {
    // console.log(categoriesRes);
    for(let i = 0; i < data.categoriesDB.length; i++) {
        categoriesContainer.innerHTML += `
            <a class="category" href='/categoria/${data.categoriesDB[i].url}'>
                <figure>
                    <img src='${data.categoriesDB[i].pic}' alt="">
                </figure>

                <span>${data.categoriesDB[i].title}</span>
            </a>
        `

    }
}