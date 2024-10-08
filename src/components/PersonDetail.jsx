import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson, removeperson } from '../store/actions/personAction'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import back from '../assets/gradient.svg'
import { asset } from '../assets/assets'
import Loader from '../pages/Loader'
import HorizontalCards from './HorizontalCards'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import Credits from './Credits'


function PersonDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);

   


  const containerRef = useRef();


  useEffect(() => {

    dispatch(asyncloadperson(params.id))
    return () => {
      console.log("Unmount")
      dispatch(removeperson())
    }

  }, [params.id])
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

    <div data-scroll-container style={{
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover', // or 'contain', depending on your needs
      backgroundPosition: 'center', // or adjust as needed
    }}
      className={` py-4 bg-[#1F1E24]  min-w-[100vw] font-chunky   min-h-[150vh]`}>
      <nav className='w-full glass text-xl text-[#faf3dd]  px-2 py-4 rounded-lg grid grid-cols-[0.3fr_2fr_2fr_2fr_1fr]  '>
        <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-100 hover:text-white"></i>
        <a target='_blank' href={info.externalId.instagram_id ? `https://www.instagram.com/${info.externalId.instagram_id}/` : "/not-found"}><i className="ri-instagram-line pr-2"></i>Instagram</a>
        <a target='_blank' href={info.externalId.facebook_id ? `https://www.facebook.com/${info.externalId.facebook_id}` : "/not-found"}><i className="ri-facebook-circle-fill pr-2"></i>FaceBook</a>
        <a target='_blank' href={info.externalId.imdb_id ? `https://www.imdb.com/name/${info.externalId.imdb_id}/` : "/not-found"}><i className="ri-error-warning-line pr-2"></i>IMDB</a>
        <Link to="/deploy-vite/">
          <img className='w-6 cursor-pointer ' src={asset.logo} alt="" />
        </Link>
      </nav>


      <div className="headsec mt-[5vmax] text-[#faf3dd] flex flex-col">

        <h1 className='text-2xl text-center tracking-wide'>{info.details.name}..</h1>
        {/* <hr className='h-[1px] bg-zinc-400/10' /> */}

        <div className="detailSection rounded-md border-y-[1px] py-3 px-4 mt-2 gap-4 flex">
          <img src={`https://image.tmdb.org/t/p/original/${info.details.profile_path || info.details.backdrop_path}`} alt="" className='w-[20vmax] h-[23vmax] object-center object-cover  rounded-md ' />
          <div className="d mt-10 flex-1">
            <p>BioGraphy:</p>
            <p className='bio  text-[15px] leading-tight font-semibold font-fon  w-[40%] text-balance line-clamp-6'>{info.details.biography || 'None'}..</p><a className={!info.details.biography ? 'hidden' : ''} href={`https://en.wikipedia.org/wiki/${info.details.name.split(" ").join("_")}`} target='_blank'><span className='text-blue-500 text-[15px] cursor-pointer'>more</span></a>
            <div className="mt-1">Birth-Date : <span className='text-sm'>{info.details.birthday || 'N/A'}</span></div>
            <div className="mt-1">Birth-Place : <span className='text-sm'>{info.details.place_of_birth || 'N/A'}</span></div>
            <div className="mt-1">Department : <span className='text-sm'>{info.details.known_for_department || 'N/A'}</span></div>


          </div>
        </div>

        

      </div>
        <h1 className='text-center text-[#faf3dd] text-xl'>Total Appearance</h1>

        {info.movieCredits || info.tvCredits ? 
          <div className="creditSection flex gap-1 justify-center text-[#faf3dd]">
            {info.movieCredits.cast.length > 0 || info.movieCredits.crew.length > 0  
             ? <Credits data={info.movieCredits} category={"movie"} /> : <></> }
          
          {info.tvCredits.cast.length > 0 || info.tvCredits.crew.length > 0  ? 
           <Credits data={info.tvCredits} category={"tv"} /> : <></>}
        
        </div>

        :<div className='w-full py-10 flex justify-center  bg-transparent mt-4 '>
              <h1 className='text-2xl w-max border-[1px] border-white px-2 py-3 rounded-md '>No Appearance Found...</h1>
        </div>
        
        
        
      }
    


    </div>

    </LocomotiveScrollProvider>

  ) : <Loader />
}

export default PersonDetail
