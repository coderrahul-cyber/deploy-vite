import React from 'react'
import { Link } from 'react-router-dom';

function Header({ data }) {
  // console.log(data)
  const image = data.backdrop_path || data.profile_path;
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${image})`,
      backgroundSize: 'cover',
      backgroundPosition: "center"

    }} className='w-full h-[60vh] flex flex-col justify-end items-start p-[4vmax]'>
      <h1 className='text-5xl font-semibold text-white'>{data.name || data.title || data.original_name || data.original_title}</h1>
      <p className='mt-3 w-[50%]'>
        {data.overview ? `${data.overview.slice(0,200)}` : "No description Found"}...
        <Link to={`/deploy-vite/${data.media_type}/${data.id}`} className='text-blue-300'>more </Link></p>
      <p className='text-white   '>
      <i className="text-yellow-400 ri-megaphone-fill mx-2"></i>{data.release_date || 'NA'}
      <i className="text-yellow-400 ri-album-fill mx-2"></i>{data.media_type || 'NA'}
      </p>
      <Link to={`${data.media_type}/${data.id}/videos`} className='bg-[#6556CD] py-3 px-4 rounded-lg w-max mt-4'>Watch Trailer</Link>
    </div>
  )
}

export default Header
