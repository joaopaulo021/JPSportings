const btnRight = document.querySelector('.right-btn');
const btnLeft = document.querySelector('.left-btn');
const img = document.querySelector('.img1');

let images = [
    ".//images/carrossel/foto1.png",
    ".//images/carrossel/foto2.png",
    ".//images/carrossel/foto3.png"


];


let i = 0;



const next = () => {
    if (i >= images.length - 1) i = -1;
    if (img.className === 'img1') {
        img.className = 'img2'

    } else {
        img.className = 'img1'

    }
    i++;
    return setImg();
}

const previous = () => {
    if (i <= 0) i = images.length;
    if (img.className === 'img1') {
        img.className = 'img2'
    } else {
        img.className = 'img1'
    }
    i--;
    return setImg();
}

const setImg = () => {
    return img.setAttribute('src', images[i]);

}