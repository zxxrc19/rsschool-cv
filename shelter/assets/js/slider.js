let sliderContainer = document.querySelector('.card__items')
let leftArrow = document.querySelector('.arrow__left');
let rightArrow = document.querySelector('.arrow__right');
let body = document.querySelector('body')
let slidesCollection = sliderContainer.children;

let petsHtml = generateHTMLContent(petsData);
let slides = randomizeHTML(petsHtml);

slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item));

for (let i = 0 ; i < slidesCollection.length; i++) {
  slidesCollection[i].classList.add('card__item_visible')
}

function generateHTMLContent(data) {

  let result = []

  for (let i = 0; i < data.length; i++) {
    let template = `<div id="${i}" class="card__item slider__item">
    <div class="slider__img">
        <img src="${data[i].img}" alt="${data[i].type} ${data[i].name}" class="card__img">
    </div>
    <p class="slider__title">${data[i].name}</p>
    <a href="#" class="slider__link">Learn more</a>    
</div>
`

result.push(template)
  }
return result;
  
}


function randomizeHTML(HTMLColllection) {

  let browserWidth = window.innerWidth;
  let slideNumbers;
  let visibleSlides = document.querySelectorAll('.card__item_visible');
  let arrayVisibleIndex = [];
  
  for (let i = 0; i < visibleSlides.length; i++) {

    arrayVisibleIndex.push(+visibleSlides[i].id)
  }
  let HTMLArrayIndex = [];

  for (let i = 0; i < HTMLColllection.length; i++) {
    HTMLArrayIndex.push(i);
  }

   if (browserWidth >= 1280) {
     slideNumbers = 3;
   } else if (browserWidth >= 768 && browserWidth < 1280 ) {

    slideNumbers = 2;
   } else  {
     slideNumbers = 1;
   }

   let filtredArray = HTMLArrayIndex.filter(item => !arrayVisibleIndex.includes(item));
   let sortedArray = filtredArray.sort((a,b)=>Math.random()*2-1).slice(0, slideNumbers);
   let result = sortedArray.map(item => HTMLColllection[item]);
   return result;
}


document.addEventListener ('click', (event) => {
  let targetDOM = event.target.classList;
  let targetArray = Array.from(targetDOM);

   if (targetArray.includes('arrow')) {
    slides = randomizeHTML(petsHtml);
    slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
    for (let i = 0; i < slidesCollection.length; i++) {
        if (slidesCollection[i].classList.contains('card__item_visible')) {
        
              slidesCollection[i].remove();
              i--;
           
        } else {

          slidesCollection[i].classList.add('card__item_visible');
        }

    }
   }

//    if (targetArray.includes('card__item')) {

//     let targetCardId = event.target.id;
//     let petsModalContent = addModalContent(petsData, targetCardId);
//     modals.insertAdjacentHTML('beforeend', petsModalContent)
//     let petsModal = modals.querySelector('.pets__modal');
//    menuBtn.classList.add('hidden');
//     body.classList.add('unscrollable');
//    petsModal.classList.add('modal__active');
//    overlay.classList.add('overlay__active');

//    }


//    if (targetArray.includes('card__button')) {
//     event.preventDefault();
//     let targetCardId = event.target.parentNode.id;
//     let petsModalContent = addModalContent(petsData, targetCardId);
//     modals.insertAdjacentHTML('beforeend', petsModalContent)
//     let petsModal = modals.querySelector('.pets__modal');
//    menuBtn.classList.add('hidden');
//     body.classList.add('unscrollable');
//    petsModal.classList.add('modal__active');
//    overlay.classList.add('overlay__active');

//    }


//    if (targetArray.includes('close__modal') || targetArray.includes('pets__modal') || (targetArray.includes('overlay') &&
//     modals.children.length > 1)) {
//       let petsModal = modals.querySelector('.pets__modal');
//      menuBtn.classList.remove('hidden');
//     body.classList.remove('unscrollable');
//     overlay.classList.remove('overlay__active');
//    petsModal.classList.remove('modal__active');
//    petsModal.remove();
//    }

//    if (targetArray.includes('overlay') && menuBtn.classList.contains('rotate')) {
//      menu()
//    }

//    if (event.target === mobileLink) {
//     menu()
//   }

  })