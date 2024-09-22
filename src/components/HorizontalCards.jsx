import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import DropDown from './DropDown'
import { asset } from '../assets/assets'

function HorizontalCards({ data }) {
    const {pathname} = useLocation()
    console.log(pathname)
    return data.length !== 0 ? (
        <div className='w-full p-4 h-max '>
            
            <div className="w-[100%] grid grid-cols-6  gap-y-5 ">

                {data && data.map((item, index) => (
                    <Link to={item.season_number == undefined ? `/deploy-vite/${item.media_type }/${item.id}` : pathname} key={index} className={`min-w-[15%] bg-zinc-900 h-max overflow-hidden pb-2 rounded-lg    mr-5 `}>
                        <img className='h-32 w-full  object-cover object-center' src={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path || item.poster_path } ` || 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='} alt="" />
                        <h1 className='text-xl text-center py-2  line-clamp-1 font-semibold  text-white'>{item.name || item.title || item.original_name || item.original_title}</h1>
                        {item.season_number == undefined || !item.air_date ?  
                        <>
                        <hr className='border-zinc-400 ' />
                          <p className='mt-3 w-full px-2 text-[0.8em] h-full '>
                              { `${item.overview.slice(0, 100)}` ||  "No description Found"}...
                              <span className='text-blue-300'>more </span></p>
                        </>
                           :<></>
                    }
                      

                    </Link>
                ))}

            </div>
        </div>
    ):<div><h1 className='w-full h-full text-3xl font-trah text-center '>Not Recommendation</h1></div>
}

export default HorizontalCards
