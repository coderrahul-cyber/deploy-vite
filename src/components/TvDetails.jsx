import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asset } from '../assets/assets'
import Loader from '../pages/Loader'
import HorizontalCards from './HorizontalCards'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { removetv , asyncloadtv } from '../store/actions/tvAction'

function TvDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } =  useSelector((state) => state.tv);
  

  const containerRef = useRef();


  useEffect(() => {

    dispatch(asyncloadtv(params.id))
    return () => {
      console.log("Unmount")
      dispatch(removetv())
    }

  }, [params.id ])
  return info ? (
    <LocomotiveScrollProvider
    options={
      {
        smooth: true,
        lerp: 0.1, // Lower the value for smoother scrolling (default is 0.1)
        multiplier: 1, // Adjust the scroll speed (slightly faster)
        smoothMobile: true, // Enable smooth scrolling on mobile as well
        inertia: 1, // Controls the scroll inertia (closer to 1 is smoother)
        getSpeed: true, // Enables tracking the scroll speed
        getDirection: true, // Enables tracking the scroll direction
        touchMultiplier: 2.5, //,
      }
    }
    watch={[]}
    containerRef={containerRef}
    >

    <div data-scroll-container ref={containerRef} style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
      backgroundSize: 'cover',
      backgroundPosition: "center"
    }} className=' flex flex-col gap-4 bg-[#1F1E24] text-white w-[100dvw] h-auto '>
      {/* px-3 py-4 */}
      <nav className='w-full glass mt-3   px-2 py-4 rounded-lg grid grid-cols-[0.3fr_2fr_2fr_2fr_1fr]  '>
        <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-400 hover:text-white"></i>
        <a target='_blank' href={info.externalId.wikidata_id ? `https://www.wikidata.org/wiki/${info.externalId.wikidata_id}` : "/not-found"}><i className="ri-global-fill pr-2"></i>WIkIPEDIA</a>
        <a target='_blank' href={info.details.homepage ? info.details.homepage : "/not-found"}><i className="ri-external-link-fill pr-2"></i>OFFICIAL LINKS</a>
        <a target='_blank' href={info.externalId.imdb_id ? `https://www.imdb.com/title/${info.externalId.imdb_id}` : "/not-found"}><i className="ri-error-warning-line pr-2"></i>IMDB</a>
        <Link to="/">
          <img className='w-6 cursor-pointer' src={asset.logo} alt="" />
        </Link>
      </nav>


      <div className="poster relative px-3 py-0  hover:shadow-2xl shadow-zinc-200/60 mt-24 h-[20vmax] w-[100%]  overflow-x-hidden overflow-y-scroll flex">

        <img className=' h-[20vmax]' src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path}`} alt="" />


        <div className="deta  peer group">
        <a target='_blank' href={info.details.homepage ? info.details.homepage : "/not-found"}>

        <h1  className='text-2xl cursor-pointer  px-4 font-trah font-semibold '>
        {info.details.name || info.details.title || info.details.original_name || info.details.original_title}
        </h1>
        </a>
        <hr className='group-hover:w-[70%] hree ' />
        <p className='text-sm line-clamp-8 text-balance py-2 px-4  max-w-[55%] '>{info.details.overview ? info.details.overview.slice(0,500) : 'No Description Found'}... </p>
        <div className="genera px-3 ">
          <h1 className='font-semibold '>Genre</h1>
          <ul>
            {info.details.genres.map((item,index)=>(
              <li className='text-sm list-disc ml-5' key={index}>{item.name}</li>
            ))}
          </ul>
        </div>

        <p className='param'><span className='text-sm  mr-1 uppercase font-semibold '>First-episode:</span> {info.details.first_air_date || "N/A"}</p>
        <p className='param'><span className='text-sm  mr-1 uppercase font-semibold '>Status ({info.details.status }):</span>{info.details.last_air_date || "N/A"}</p>
        <p className='param'><span className='text-sm mr-1 uppercase font-semibold'>Number of Season :</span>{info.details.number_of_seasons || "Not Aired"}- <span className='text-sm mr-1 uppercase font-semibold'>Number of Episode :</span>{info.details.number_of_episodes || "N/A"}</p>

        <p className='param text-nowrap overflow-x-scroll mb-4 w-[50%] px-3 '><span className='text-sm  mr-1 uppercase font-semibold'>Movie Translation : </span>{info.translations.join(" , ")}</p>
          <div className="mt-4 px-3">

        <Link className='px-3  rounded-lg bg-blue-400 py-2' to={`/tv/${info.details.id}/videos`}>Play Trailer</Link>
          </div>

        </div>

        

      </div>

      <div className="w-full px-3 py-4 border-b-[1px] pb-5 border-zinc-200/40 rounded-md  ">



        <div className="  w-full flex items-center gap-4">
          <div className="online flex items-center gap-1 px-2 border-r-[1px] border-zinc-400  ">
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

      <div className="season px-3   w-full h-max">
      <h1 className='mt-2 w-max text-3xl px-4 font-fon border-b-[1px] border-zinc-400 '>Seasons</h1>
      

        <HorizontalCards data={info.details.seasons}
 />

      </div>

      <div className="recommandation px-3   w-full h-max">
      <h1 className='mt-2 w-max text-3xl px-4 font-fon border-b-[1px] border-zinc-400 '>Recommendations</h1>
      

        <HorizontalCards data={info.recommendation ? info.recommendation : info.similar}
 />

      </div>

      <Outlet/>


    </div>

    </LocomotiveScrollProvider>
  ) : <Loader />
}

export default TvDetails
