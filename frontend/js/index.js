import '../css/index.css';
import { Modal } from './classes/modal';
document.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.id == 'buttonSearch' || e.target.parentElement.id == 'buttonSearch') {
        const searchModal = new Modal(document.getElementById('searchModal'));
        searchModal.bringModalFromLeft();
    }
    if(e.target.id == 'buttonBars' || e.target.parentElement.id == 'buttonBars') {
        const hambModal = new Modal(document.getElementById('hambModal'));
        hambModal.bringModalFromLeft();
    }
    if(e.target.id == 'buttonCloseModal' || e.target.parentElement.id == 'buttonCloseModal') {
        const closeModal = new Modal();
        closeModal.hideModalToRight(closeModal.searchModalActive());
        closeModal.removeActiveModal(closeModal.searchModalActive());
    }
})





