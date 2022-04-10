document.addEventListener('DOMContentLoaded', function () {
    // const slider = new ChiefSlider('.slider', {
    //   loop: false
    // });


   if(!document.querySelector('.slider__pets')){
      let position = 0;
      const slidesToShow = 3;
      const clidesToScroll = 1;
      const track = document.querySelector('.slider__items');
      const item = document.querySelectorAll('.slider__item');
      const itemsCount = item.length;

      const btnSliderL = document.querySelector('.slider__control-l');
      const btnSliderR = document.querySelector('.slider__control-r');

      const itemWidth = 360;
      let movePosition = clidesToScroll* itemWidth;
      
      btnSliderL.addEventListener('click', function () {
        
        position += movePosition;
        track.style.transform = `translateX(${position}px) `
        checkBtn()
      });
      
      btnSliderR.addEventListener('click', function () {
      
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