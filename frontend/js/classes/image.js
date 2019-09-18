export class ImageProduct {
    constructor(imgActive){
        this.imgActive = imgActive;
        this.imgLength = document.querySelectorAll('figure img').length;
        this.allImages = document.querySelectorAll('figure img');
    
    }

    nextActive() {
        this.imgActive.classList.remove('active');
        this.putImagesToRight();
        if(this.imgActive.nextElementSibling.tagName == 'IMG') {
            this.imgActive.nextElementSibling.classList.add('active');
            return this.imgActive.nextElementSibling;
        } else {
            document.querySelector('figure img').classList.add('active');
            return document.querySelector('figure img');
        }
    }

    backActive() {
        this.imgActive.classList.remove('active');
        this.putImagesToLeft();
        if(this.imgActive.previousElementSibling.tagName == 'IMG') {
            this.imgActive.previousElementSibling.classList.add('active');
            return this.imgActive.previousElementSibling;
        } else {
            document.querySelectorAll('figure img')[this.imgLength - 1].classList.add('active');
            return document.querySelectorAll('figure img')[this.imgLength - 1]
        }
    }

    putImagesToRight() {
        for(let i = 0; i < this.imgLength; i++) {
            this.allImages[i].style.left = '100%';

        }
    }

    putImagesToLeft() {
        for(let i = 0; i < this.imgLength; i++) {
            this.allImages[i].style.left = '-100%';

        }
    }

    static resizeFigure(figure, imgActive){
        if(imgActive.offsetHeight < 250) {
            figure.style.height = `${imgActive.offsetHeight}px`;
        }
    }
    
    selectImage(id) {
        // this.getImageSelected(id).style.left = '0';
        this.getImageSelectedId(id).style.left = '0';
    }

    getImageSelectedId(id) {
        return document.querySelectorAll('figure img')[id - 1]; 
    }

}