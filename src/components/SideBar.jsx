import React, { useEffect } from 'react'
import { asset } from '../assets/assets'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'

function SideBar() {
  
  return (
    <div className='w-[20%] flex flex-col select-none  h-full border-r-[1px] p-3 rounded-xl   border-zinc-400 '>
        <h1 className='flex gap-4 text-2xl    font-fon  py-2      items-center'>
             <img className='w-5 ' src={asset.logo} alt="" />
            Pratice Project</h1>

        <nav className='flex flex-col gap-5   border-b-[1px] pb-10 rounded-md  text-lg'>
            <h1 className='title mt-10 mb-0  text-center   '>New feeds</h1>
            <hr className='h-[1px] border-zinc-500  ' />
            <Link to="/deploy-vite/trending" className='navv duration-500 '>
            <i className="ri-fire-fill mr-2"></i>Trending</Link>
            <Link to="/deploy-vite/popular" className='navv duration-500'><i className="ri-bard-line mr-2"></i>Popular</Link> 
            <Link to="/deploy-vite/movies" className='navv duration-500 '><i className="ri-movie-2-line mr-2"></i>Movies</Link>
            <Link to="/deploy-vite/tv-show" className='navv duration-500'><i className="ri-slideshow-view mr-2"></i>tv Shows</Link>
            <Link to="/deploy-vite/people" className='navv duration-500 '><i className="ri-team-fill mr-2"></i>People</Link>
        </nav>


        <footer className='flex flex-col gap-5    text-lg'>
        <h1 className='title mt-10  text-center   '>Web-Site Information</h1>
            <hr className='h-[1px] border-zinc-500  ' />
            <Link className='navv duration-500 '>
            <i className="ri-information-line mr-2"></i>About</Link>
            <Link className='navv duration-500'><i className="ri-contacts-line mr-2"></i>Contact</Link> 
        </footer>
      
    </div>
  )
}

export default SideBar
