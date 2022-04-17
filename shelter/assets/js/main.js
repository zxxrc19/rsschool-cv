document.addEventListener('DOMContentLoaded', function () {


   if(!document.querySelector('.slider__pets')){

    const clidesToScroll = 1;

    let position = 0; 
    let slidesToShow = 3;   
    let itemWidth = 360;
    let movePosition = 0;

    const track = document.querySelector('.slider__items');
    const item = document.querySelectorAll('.slider__item');
    const itemsCount = item.length;

    const btnSliderL = document.querySelector('.slider__control-l');
    const btnSliderR = document.querySelector('.slider__control-r');

  //  window.addEventListener(`resize`, event => {
      
      let width = document.documentElement.clientWidth;

      if(width<1280){
        slidesToShow = 2;
        itemWidth = 310;
      }
      
      movePosition = clidesToScroll* itemWidth;

      btnSliderL.addEventListener('click', function () {
        
        position += movePosition;
        track.style.transform = `translateX(${position}px) `
        checkBtn()
      });
      
      btnSliderR.addEventListener('click', function () {
      console.log(movePosition)
        position -= movePosition;
        track.style.transform = `translateX(${position}px) `
        checkBtn()
      });

      const checkBtn = () => {
        btnSliderL.disabled = position === 0
        btnSliderR.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
        if(position === 0) { 
          btnSliderL.classList.add('slider__control_hide')
        }
        else{
          btnSliderL.classList.remove('slider__control_hide')
        }

        if(position <= -(itemsCount - slidesToShow) * itemWidth) { 
          btnSliderR.classList.add('slider__control_hide')
        }
        else{
          btnSliderR.classList.remove('slider__control_hide')
        }
      }
      checkBtn()


  // }, false);
   

   }

   else if(document.querySelector('.slider__pets')){

        let count =1;
        let position = 0;

        const slidesToShow = 4;
        const clidesToScroll = 1;
        const track = document.querySelector('.slider__items');
        const item = document.querySelectorAll('.slider__item');
        const itemsCount = item.length;

        const btnSliderL = document.querySelector('.slider__control-l');
        const btnSliderR = document.querySelector('.slider__control-r');


        const btnSliderLAll = document.querySelector('.slider__control-prev2');
        const btnSliderRAll = document.querySelector('.slider__control-next2');
    

        const itemWidth = 310;
        let movePosition = clidesToScroll* itemWidth;
        
        btnSliderL.addEventListener('click', function () {
          position += movePosition;
          track.style.transform = `translateX(${position}px) `
          checkBtn();
          count--;
          document.querySelector('.slider__control-num').innerHTML = count
        });

        btnSliderLAll.addEventListener('click', function () {
          position = 0;
          track.style.transform = `translateX(${position}px) `
          checkBtn();
          count=1;
          document.querySelector('.slider__control-num').innerHTML = count
        });


        btnSliderR.addEventListener('click', function () {
          position -= movePosition;
          track.style.transform = `translateX(${position}px) `
          
          count++;
          document.querySelector('.slider__control-num').innerHTML = count

          checkBtn()
        });


        btnSliderRAll.addEventListener('click', function () {
          position = -(itemsCount/2 - slidesToShow) * itemWidth;
          track.style.transform = `translateX(${position}px) `
         
          count=5;
          document.querySelector('.slider__control-num').innerHTML = count
          checkBtn();
        });

      const checkBtn = () => {
        btnSliderL.disabled = position === 0
        btnSliderR.disabled = position <= -(itemsCount/2 - slidesToShow) * itemWidth;
        if(position === 0) { 
          btnSliderL.classList.add('slider__control_hide')
          btnSliderLAll.classList.add('slider__control_hide')
        }
        else{
          btnSliderL.classList.remove('slider__control_hide')
          btnSliderLAll.classList.remove('slider__control_hide')
        }

        if(position <= -(itemsCount/2 - slidesToShow) * itemWidth) { 
          btnSliderR.classList.add('slider__control_hide')
          btnSliderRAll.classList.add('slider__control_hide')
        }
        else{
          btnSliderR.classList.remove('slider__control_hide')
          btnSliderRAll.classList.remove('slider__control_hide')
        }
      }
      checkBtn()
   }

  });
  const menuList = document.querySelector('.nav__menu');
  const menuLogo = document.querySelector('.nav__logo');
  const menuBurger = document.querySelector('.nav__burger');
  const headerPets = document.querySelector('.header__pets');

  document.querySelector('#btnBurger').addEventListener('click', ()=>{
    menuList.classList.toggle('nav__menu-active');
    menuLogo.classList.toggle('nav__logo-active');
    menuBurger.classList.toggle('nav__burger-active');
    headerPets.classList.toggle('header__pets-active');
  })