import { animations } from './animations';

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
