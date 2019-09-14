import { animations } from '../animations';
export class Modal {
    
    constructor(modal) {
        this.modal = modal;
    }

    bringModalFromLeft() {
        animations.bringFromLeft(this.modal);
    }

    hideModalToRight() {
        animations.hideModalToRight(this.modal);
    }

    hideModalToRight(modal) {
        animations.hideModalToRight(modal);
    }

    searchModalActive(){
        return document.querySelector('.modal.active');
    }

    removeActiveModal() {
        this.searchModalActive().classList.remove('active');
    }
}



export default Modal;
// module.exports = {
//     Modal
// }