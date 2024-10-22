import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"


Info.propTypes ={
  info : PropTypes.any
}

function Info({info}) {
 const {pathname} = useLocation()
 console.log(info)
  return (
    <>
   <div className="poster relative px-3 py-0  hover:shadow-2xl shadow-zinc-200/60 mt-2  sm:mt-16 h-[40vmax] md:h-[40vmax] lg:h-[30vmax]  w-[100%]  overflow-x-hidden overflow-y-scroll flex items-center">

<img className='h-[30vmax]   sm:h-[30vmax]' src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path}`} alt="" />


<div className="deta  peer group">
<a target='_blank' href={info.details.homepage ? info.details.homepage : "/not-found"}>

<h1  className='sm:text-2xl text-wrap  cursor-pointer  px-4 font-trah font-semibold '>
{info.details.name || info.details.title || info.details.original_name || info.details.original_title}
</h1>
</a>
<hr className='group-hover:w-[70%] hree ' />
<p className='sm:text-sm text-xs font-mono  line-clamp-6 text-balance py-2  px-4 w-[25vh]    sm:w-[55%] '>{info.details.overview ? info.details.overview.slice(0,400) : 'No Description Found'}... </p>
<div className="genera px-3 ">
  <h1 className='font-semibold '>Genre</h1>
  <ul>
    {info.details.genres.map((item,index)=>(
      <li className='text-sm  ml-5 font-mono inline ' key={index}>{item.name}</li>
    ))}
  </ul>
</div>



{pathname.includes('tv') &&
<> <p className='param text-xs'><span className='sm:text-sm text-xs   mr-1 uppercase sm:font-semibold '>First-episode:</span> {info.details.first_air_date || "N/A"}</p>
<p className='param text-xs'><span className='sm:text-sm  text-xs  mr-1 uppercase  font-mono sm:font-semibold '>Status ({info.details.status }):</span>{info.details.last_air_date || "N/A"}</p>
<p className='param text-xs '><span className='sm:text-sm text-xs  mr-1 uppercase  font-mono sm:font-semibold'>Number of Season : </span>{info.details.number_of_seasons || "Not Aired"}<br/> <span className='sm:text-sm text-xs  mr-1 uppercase  font-mono sm:font-semibold '>Number of Episode :</span>{info.details.number_of_episodes || "N/A"}</p></>}

<p className='param text-xs text-nowrap overflow-x-scroll mb-4 w-[50%] px-3 '><span className='sm:text-sm  text-xs  mr-1 uppercase  font-mono sm:font-semibold'>Movie Translation : </span>{info.translations.join(" , ")}</p>
  <div className="mt-4 px-3">

<Link className='px-3  rounded-lg bg-blue-400 py-2' to={`/deploy-vite/tv/${info.details.id}/videos`}>Play Trailer</Link>
  </div>

</div>



</div>

<div className="w-full px-3 py-4 border-b-[1px] pb-5 border-zinc-200/40 rounded-md  ">
<div className="  w-full flex items-center sm:gap-4">
  <div className="online flex items-center sm:gap-1 px-2 border-r-[1px] border-zinc-400  ">
    <p className='text-sm text-zinc-300'>Watch NOW :</p>
    {info.watchProvider && info.watchProvider.flatrate && info.watchProvider.flatrate.map((item, index) => (
      <img key={index} className='watch' src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
    )) || <span className='text-xs text-zinc-300'>Not Avaiable Now</span>}

  </div>
  <div className="rent flex items-center px-2 border-r-[1px] border-zinc-400 gap-1">
    <p className='text-sm text-zinc-300'>Rent NOW :</p>
    {info.watchProvider && info.watchProvider.rent && info.watchProvider.rent.map((item, index) => (
      <img key={index} className='watch' src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
    )) || <span className='text-xs text-zinc-300'>Not Avaiable Now</span>}
  </div>
  <div className="buy flex items-center px-2 border-r-[1px] border-zinc-400  gap-1">
    <p className='text-sm text-zinc-300 mr-2'>Buy NOW :</p>
    {info.watchProvider && info.watchProvider.buy && info.watchProvider.buy.map((item, index) => (
      <img key={index} className='watch' src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
    ))|| <span className='text-xs text-zinc-300'>Not Avaiable Now</span>}
  </div>
</div>



</div>
    </>
  )
}

export default Info
