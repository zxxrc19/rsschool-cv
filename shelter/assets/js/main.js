const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

document.addEventListener('DOMContentLoaded', function () {

  const sliderContainer = document.querySelector('.slider__items');
  const sliderControls = document.querySelector('.slider__controls');
  const modals = document.querySelector('.modals');
  const slidesCollection = sliderContainer.children;
  const petsHtml = generateHTMLContent(petsData);
  let slides = randomizeHTML(petsHtml);
  let cardsArry = generateRandomArray(petsHtml, 6).map(item => petsHtml[item]); 
  let cardsPerPage = getCardPerPage();



  if(document.querySelector('.header__pets')){
    generatePagination(cardsArry);
    let cards = cardsArry.slice(0, cardsPerPage);
    cards.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
    let setExample = generateSet(petsHtml);
  }
  else if(!document.querySelector('.header__pets')){
    slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item));
      
    for (let i = 0 ; i < slidesCollection.length; i++) {
      slidesCollection[i].classList.add('card__item_visible')
    }
  }

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  
  function generateSet(data, size) {
    let set = new Set();
    while (set.size < size) {
      let randomNumber = randomInteger(0, data.length - 1);
      set.add(randomNumber);
    }
    return set;
  }
  
  function getCardPerPage() {
    let browserWidth = window.innerWidth;
    let slidesPerPage;
    if (browserWidth >= 1280) {
        slidesPerPage = 8;
      } else if (browserWidth >= 767 && browserWidth < 1280 ) {
   
       slidesPerPage = 6;
      } else  {
        slidesPerPage = 3;
      }
  
      return slidesPerPage;
  }
  
  function getPages (array) {
      let cardsPerPage = getCardPerPage();
      let pages = array.length / cardsPerPage;
      return pages;
  }
  
  function generatePagination(array) {
    let pages = getPages(array);
   
    let currentPage = sliderControls.querySelector('.pagination__item_active') ;
  
    if (currentPage === null) {
  
      currentPage = 1;
    }
    
    let template = `<button data-firstPage class="pagination__item pagination__item_disabled" >&lt;&lt;</button>
    <button data-previous  class="pagination__item pagination__item_disabled" >&lt;</button>
    <button data-current class="pagination__item pagination__item_active">${currentPage}</button>
    <button data-next class="pagination__item">&gt;</button>
    <button data-lastPage = "${pages}" class="pagination__item">&gt;&gt;</button>`
  
  
  sliderControls.insertAdjacentHTML('beforeend', template);
  
  }
    
  function generateHTMLContent(data) {
  
    let result = []
  
    for (let i = 0; i < data.length; i++) {
      let template = `<div id="${i}" class="slider__item">
                        <div class="slider__img">
                            <img src="${data[i].img}" alt="${data[i].type} ${data[i].name}" >
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
  
  function addModalContent(dataArray, id) {
    let template = ` 
      <section class="modal">
        <button class="modal__close" type="button">Закрыть</button>
        <div class="modal__container">
          <div class="modal__img">
              <img src="${dataArray[id].img}" alt="${dataArray[id].type} ${dataArray[id].name}">
          </div>
          <div class="modal__wrapper">
            <h3 class="modal__title"> ${dataArray[id].name}</h3>
            <h4 class="modal__subtitle"> ${dataArray[id].type} -  ${dataArray[id].breed}</h4>
            <p class="modal__desc"> ${dataArray[id].description}</p>
            <ul class="modal__list">
              <li><span>Age:</span>  ${dataArray[id].age}</li>
              <li><span>Inoculations:</span>  ${dataArray[id].inoculations.join()}</li>
              <li><span>Diseases:</span>  ${dataArray[id].diseases.join()}</li>
              <li><span>Parasites:</span>  ${dataArray[id].parasites.join()}</li>
            </ul>  
          </div>   
        </div>
      </section>
  `
  return template;
  }

  function generateRandomArray(data, repeatTimes) {

    let resultArray = [];
  
    while (resultArray.length <= 48) {
      let set = generateSet(data, getCardPerPage());
      let setArray = Array.from(set);
      resultArray.push(setArray);
    }
    resultArray = resultArray.flat();
    resultArray = resultArray.slice(0, 48);
  
  return resultArray;
  }
  
  document.addEventListener ('click', (event) => {
    let targetDOM = event.target.classList;
    let targetArray = Array.from(targetDOM);



    if(document.querySelector('.header__pets')){
      let paginationFirstPage = sliderControls.querySelector('[data-firstPage]');
      let paginationPrevious = sliderControls.querySelector('[data-previous]');
      let paginationCurrent = sliderControls.querySelector('[data-current]');
      let paginationNext = sliderControls.querySelector('[data-next]');
      let paginationLast = sliderControls.querySelector('[data-lastPage]');
      let cardsPerPage = getCardPerPage();
      let currentPageNumber = Number(paginationCurrent.innerText);
      let pages = getPages(cardsArry);

      if (event.target === paginationNext ) {
    
        let nextPage = currentPageNumber + 1;
      
        if (nextPage < pages) {
          sliderContainer.innerHTML = '';
          let startIndex = (nextPage - 1) * cardsPerPage;
          let endIndex = startIndex + cardsPerPage;
          cards = cardsArry.slice(startIndex, endIndex);
          cards.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
        
          paginationPrevious.classList.remove('pagination__item_disabled');
          paginationFirstPage.classList.remove('pagination__item_disabled');
          paginationCurrent.innerText = nextPage;
        } 
        
        if (nextPage === pages) {
          sliderContainer.innerHTML = '';
          let startIndex = (pages - 1) * cardsPerPage;
          let endIndex = startIndex + cardsPerPage;
          cards = cardsArry.slice(startIndex, endIndex);
          cards.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
          paginationNext.classList.add('pagination__item_disabled');
          paginationLast.classList.add('pagination__item_disabled');
          paginationCurrent.innerText = pages;
        }
      }
      
      if (event.target === paginationLast) {
        sliderContainer.innerHTML = '';
        let startIndex = (pages - 1) * cardsPerPage;
        let endIndex = startIndex + cardsPerPage;
        cards = cardsArry.slice(startIndex, endIndex);
        cards.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
        paginationCurrent.innerText = pages;
        paginationPrevious.classList.remove('pagination__item_disabled');
        paginationFirstPage.classList.remove('pagination__item_disabled');
        paginationNext.classList.add('pagination__item_disabled');
        paginationLast.classList.add('pagination__item_disabled');
      }
      
      if (event.target === paginationPrevious) {
        let previousPage = currentPageNumber - 1;
      
        if (previousPage >= 1) {
          sliderContainer.innerHTML = '';
      
          let startIndex = (previousPage - 1) * cardsPerPage;
          let endIndex = startIndex + cardsPerPage;
      
          cards = cardsArry.slice(startIndex, endIndex);
          cards.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
          paginationNext.classList.remove('pagination__item_disabled');
          paginationLast.classList.remove('pagination__item_disabled');
          paginationCurrent.innerText = previousPage;
      
        }
      
        if (previousPage === 1) {
      
          paginationPrevious.classList.add('pagination__item_disabled');
          paginationFirstPage.classList.add('pagination__item_disabled');
        }
      
      }
      
      if (event.target === paginationFirstPage) {
         sliderContainer.innerHTML = '';
         let startIndex = 0;
         let endIndex = startIndex + cardsPerPage;
         cards = cardsArry.slice(startIndex, endIndex);
         cards.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item));
      
         paginationPrevious.classList.add('pagination__item_disabled');
        paginationFirstPage.classList.add('pagination__item_disabled');
        paginationNext.classList.remove('pagination__item_disabled');
        paginationLast.classList.remove('pagination__item_disabled');
        paginationCurrent.innerText = '1';
      
      }
    }
    
    if (targetArray.includes('slider__control')) {
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

    if (targetArray.includes('slider__link')) {
      event.preventDefault();
      let targetCardId = event.target.parentNode.id;
      let petsModalContent = addModalContent(petsData, targetCardId);
      modals.insertAdjacentHTML('beforeend', petsModalContent)
      let petsModal = modals.querySelector('.modal');
      body.classList.add('unscrollable');
      petsModal.classList.add('modal__active');
      overlay.classList.add('overlay__active');
  
     }
  
    if (targetArray.includes('slider__item') || event.target.parentNode.classList[0] == "slider__img"){
      event.preventDefault();
      let targetCardId = '';
      if(event.target.parentNode.classList[0] == "slider__img"){
         targetCardId = +event.target.parentElement.parentElement.id;
      }
      else{
        targetCardId = event.target.id;
      }
      let petsModalContent = addModalContent(petsData, targetCardId);
      modals.insertAdjacentHTML('beforeend', petsModalContent)
      let petsModal = modals.querySelector('.modal');
      body.classList.add('unscrollable');
      petsModal.classList.add('modal__active');
      overlay.classList.add('overlay__active');
    }

    if (targetArray.includes('modal__close') || (targetArray.includes('overlay'))){      
      let petsModal = modals.querySelector('.modal');
      body.classList.remove('unscrollable');
      overlay.classList.remove('overlay__active');
      petsModal.classList.remove('modal__active');
      petsModal.remove();
    }
    else if(event.target.offsetParent.classList.contains('modal__active')){
      event.preventDefault(); 
      overlay.classList.add('overlay__active');
    }


  })
})

document.addEventListener ('click', (event) => {
  const nav = document.querySelector('.nav');
  const menuList = document.querySelector('.nav__menu');
  const menuLogo = document.querySelector('.nav__logo');
  const menuBurger = document.querySelector('.nav__burger');
  const headerPets = document.querySelector('.header__pets');

  console.log(event.target)
  if(document.querySelector('#btnBurger') == event.target){ 
    if(document.querySelector('.nav__menu-active')){
      nav.prepend(menuLogo);
    }
    else{
      menuList.prepend(menuLogo);
    }
    body.classList.toggle('scrool');
    menuList.classList.toggle('nav__menu-active');
    menuLogo.classList.toggle('nav__logo-active');

    menuBurger.classList.toggle('nav__burger-active');
    overlay.classList.toggle('overlay__active');
    if(headerPets){
      headerPets.classList.toggle('header__pets-active');
    }
  }
  else if(document.querySelector('.overlay') == event.target){
    if(document.querySelector('.nav__menu-active') || document.querySelector('.modal__active')){
      nav.prepend(menuLogo);
    }
    else{
      menuList.prepend(menuLogo);
    }
    body.classList.remove('scrool');
    menuList.classList.remove('nav__menu-active');
    menuLogo.classList.remove('nav__logo-active');
    menuBurger.classList.remove('nav__burger-active');
    overlay.classList.remove('overlay__active');
    if(headerPets){
      headerPets.classList.remove('header__pets-active');
    }
  }

})


