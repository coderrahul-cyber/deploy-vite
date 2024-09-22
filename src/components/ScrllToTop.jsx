import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll'; // Import scroll utility

function ScrollToTopButton() {
  const [isVisible , setIsVisible] = useState(false);

  // function handle the scroll evenet 

  const toggleVisibility =()=>{
    // console.log(window.scrollY)
    if(window.scrollY > 100 ){
        setIsVisible(true);
    }else{
        setIsVisible(false);
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll' , toggleVisibility);
    return ()=> window.removeEventListener('scroll' , toggleVisibility);
  },[])

  return (
    <div>
      {isVisible && (
        <div 
          onClick={() => scroll.scrollToTop()} // Smooth scroll to top on click
          className={`fixed w-[4vmax] h-[4vmax] z-50 cursor-pointer rounded-full bottom-1 right-4 glass transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className='flex w-full h-full items-center justify-center'>
            <i className="ri-arrow-up-s-fill rounded-full text-white"></i>        
          </span>
        </div>
      )}
    </div>
  );
}

export default ScrollToTopButton;
