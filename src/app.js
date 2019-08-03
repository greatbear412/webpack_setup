import smallSizeImage from './assets/small-image.png';
import normalSizeImage from './assets/normal-image.png';
import bigSizeImage from './assets/big-image.png';

let result = [1, 2, 3].map((n) => n + 1);

let smallSizeImageElement=document.createElement(('img'));
smallSizeImageElement.src=smallSizeImage;
document.body.appendChild(smallSizeImageElement)

let normalSizeImageElement=document.createElement(('img'));
normalSizeImageElement.src=normalSizeImage;
document.body.appendChild(normalSizeImageElement)

let bigSizeImageElement=document.createElement(('img'));
bigSizeImageElement.src=bigSizeImage;
document.body.appendChild(bigSizeImageElement)

console.log('====================================');
console.log(123);
console.log('====================================');

let opso = ()=>{
    console.log('====================================');
    console.log(456);
    console.log('====================================');
}

opso()
require('./app.css')