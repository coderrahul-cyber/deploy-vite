import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Header.propTypes ={
  data : PropTypes.any
}

function Header({ data }) {
  const image = data.backdrop_path || data.profile_path;
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${image})`,
      backgroundSize: 'cover',
      backgroundPosition: "center"

    }} className='w-[100vw] sm:h-[60vh] h-[40dvh] flex flex-col justify-end items-start px-4 pb-2 sm:p-[4vmax]'>
      <h1 className='sm:text-5xl text-4xl   font-semibold font-mono text-white'>{data.name || data.title || data.original_name || data.original_title}</h1>
      <div className='mt-3 sm:w-[50%] '>
        <p className='line-clamp-4  text-sm sm:text-lg sm:line-clamp-none '>
        {data.overview ? `${data.overview.slice(0,200)}` : "No description Found"}...
        </p>
        <Link to={`/deploy-vite/${data.media_type}/${data.id}`} className='text-blue-300'>more </Link></div>
      <p className='text-white   '>
      <i className="text-yellow-400 ri-megaphone-fill sm:mx-2"></i>{data.release_date || 'NA'}
      <i className="text-yellow-400 ri-album-fill mx-2"></i>{data.media_type || 'NA'}
      </p>
      <Link to={`${data.media_type}/${data.id}/videos`} className='bg-[#6556CD] py-2 px-3 sm:py-3 sm:px-4 rounded-lg w-max mt-4'>Watch Trailer</Link>
    </div>
  )
}

export default Header
