import { useEffect, useState } from 'react'
import { asset } from '../assets/assets'
import { Link } from 'react-router-dom'

function SideBar() {

  const [isMenu , setMenu] = useState(false);
  const [windowSize , setWindowSize] = useState(window.innerWidth);

  useEffect(()=>{
    const handleresize = ()=> setWindowSize(window.innerWidth);
    window.addEventListener('resize' , handleresize);

    return()=> window.removeEventListener('resize' , handleresize);
  },[]);

  const toggleMenu = ()=>{
    setMenu(!isMenu);
  }
  
  return (
    <div style={{
      transform: windowSize <= 430 
      ? (isMenu ? 'translateX(0)' : 'translateX(-100%)') 
      : 'translateX(0)',
      transition : 'transform 0.5s ease-in-out',
      
    }} className='sm:w-[20%] w-[70%] bg-black absolute z-[999]   sm:flex flex-col select-none overflow-x-hidden overflow-y-scroll  h-full border-r-[1px] p-3 rounded-xl   border-zinc-400 '> 
      {!isMenu && windowSize <= 430 && (  <i className="ri-menu-line absolute -right-20 top-5   text-2xl cursor-pointer  mr-[18%] ml-2 md:hidden " onClick={toggleMenu}></i>)}
        <h1 className='flex gap-4 text-2xl    font-fon  py-2      items-center'>
             <img className='w-5 ' src={asset.logo} alt="" />
            MovieVerse           <i onClick={toggleMenu} className="ri-close-line ml-[20%] text-xl sm:hidden"></i>
            </h1>

        <nav className='flex flex-col gap-5   border-b-[1px] pb-10 rounded-md  text-lg'>
            <h1 className='title mt-10 mb-0  text-center   '>New feeds</h1>
            <hr className='h-[1px] border-zinc-500  ' />
            <Link  to="/deploy-vite/trending" className='navv relative z-50  duration-500 '>
            <i className="ri-fire-fill mr-2 text-[2vmax] sm:text-xl"></i><span className='text-[2vmax] sm:text-xl'>Trending
              </span></Link>
            <Link to="/deploy-vite/popular" className='navv relative z-50 duration-500'><i className="ri-bard-line mr-2 text-[2vmax] sm:text-xl"></i><span className='text-[2vmax] sm:text-xl'>Popular</span></Link> 
            <Link to="/deploy-vite/movies" className='navv relative z-50 duration-500 '><i className="ri-movie-2-line mr-2 text-[2vmax] sm:text-xl"></i><span className='text-[2vmax] sm:text-xl'>Movies</span></Link>
            <Link to="/deploy-vite/tv-show" className='navv relative z-50 duration-500'><i className="ri-slideshow-view mr-2 text-[2vmax] sm:text-xl"></i><span className='text-[2vmax] sm:text-xl'>tv</span></Link>
            <Link to="/deploy-vite/people" className='navv relative z-50 duration-500 '><i className="ri-team-fill mr-2 text-[2vmax] sm:text-xl"></i><span className='text-[2vmax] sm:text-xl'>People</span></Link>
        </nav>


        <footer className='flex flex-col gap-5    text-lg'>
        <h1 className='title mt-10  text-center   '>Web-Site Information</h1>
            <hr className='h-[1px] border-zinc-500  ' />
            <p className='font-mono leading-4 text-sm line-clamp-4'>This is the pratice project made by the <span className='underline font-semibold tracking-wide text-[16px]'>Rahul Samant</span> who is a full stack developer for more info click the below<mark>PLEASE USE WIFIE AS IT IS FROM EXTERNAL DATABASE</mark></p>
            <a href='' target='#' className='navv duration-500 text-[4vmax] sm:text-xl'><i className="ri-contacts-line mr-2 text-xl"></i><span className='text-[2vmax] sm:text-xl'>Contact</span></a> 
        </footer>
      
    </div>
  )
}

export default SideBar
