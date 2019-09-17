import '../css/global.css'
import '../css/list-products.css';
import './global';
import '../css/singleProduct.css';
import { ImageProduct } from './classes/image';
import { animations } from './animations';

document.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    
    if(e.target.id == 'next') {
        const imageProduct = new ImageProduct(document.querySelector('img.active'));        
        animations.hideModalToLeft(document.querySelector('img.active'));
        animations.bringFromRight(imageProduct.nextActive())

    }

    if(e.target.id == 'back') {
        const imageProduct = new ImageProduct(document.querySelector('img.active'));
        animations.hideModalToRight(document.querySelector('img.active'));
        animations.bringFromLeft(imageProduct.backActive());
    }
})


document.addEventListener('DOMContentLoaded', (e) => {
    ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'));
})

window.addEventListener('load', (e) => {
    ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'));
})

window.addEventListener('resize', (e) => {
    ImageProduct.resizeFigure(document.querySelector('.product.container figure'), document.querySelector('section figure img.active'));
});

