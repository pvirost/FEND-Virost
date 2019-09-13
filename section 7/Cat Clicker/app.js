let count = 0
let counter = document.querySelector('.number');

let img = document.querySelector('#cat');
img.addEventListener('click', function(){
  //the element has been clicked... do stuff here
  count++;
  counter.textContent = `${count}`;
}, false);