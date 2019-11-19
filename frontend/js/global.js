import { animations } from './animations';


const inputSearchProduct = document.getElementById('searchProduct');
const resultProducts = document.getElementById('resultProducts');

if(inputSearchProduct) {
    
inputSearchProduct.addEventListener('input', (e) => searchProdcut(e), false);

let searchProdcut = debounce( async (e) => {

    // console.log(e.target.value.trim());
    let query = e.target.value.trim();

    if(query !== '') {
        let reqSearchProducts = await fetch(`/api/product/live-search`, {
            method: 'POST',
            body: JSON.stringify({
                product: query
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        let resSearchProducts = await reqSearchProducts.json();
        renderSearchProducts(resSearchProducts)

    } else {
        resultProducts.innerHTML = ''
    }

}, 500);

}

function renderSearchProducts(data) {
    resultProducts.innerHTML = '';
    if(data.productDB.length > 0) {
        data.productDB.forEach((product, index) => {
            let user = product.user;
            let productInfo = product.product;
            resultProducts.innerHTML += `
            <a href='/producto/${productInfo.url}' class="list-product">
                <figure>
                    <img src='${productInfo.mainImg}' alt="">
                    <p class="prize">${productInfo.prize}</p>
                </figure>
                <div class="info-product">
                    <h3 class="title-product">${productInfo.title}</h3>
                    <p class="desc-product">${productInfo.description}</p>
                        <div class="detail-product">
                            <p class="location-product">${user.address.city || ''} ${user.address.state || ''}</p>
                            <p class="author-product">${user.firstName} ${user.lastName}</p>
                        </div>
                    </div>
            </a>
            `
        })
    }
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


document.addEventListener('click', (e) => {
    // e.preventDefault();

    if(e.target.id == 'buttonSearch' || e.target.parentElement.id == 'buttonSearch') {
        animations.bringFromRight(document.getElementById('searchModal'))
    }
    if(e.target.id == 'buttonBars' || e.target.parentElement.id == 'buttonBars') {
        animations.bringFromRight(document.getElementById('hambModal'));
    }
    if(e.target.id == 'buttonCloseModal' || e.target.parentElement.id == 'buttonCloseModal') {
        animations.hideModalToRight(document.querySelector('.modal.active'));
    }
})


window.addEventListener('load', (e )=> {

    if(document.querySelector('footer')) {
        if(document.documentElement.offsetHeight < window.innerHeight) {
            document.querySelector('footer').style = `
            position: absolute;
            width: 100%;
            bottom: 0
            `
        }
    }
    
})
