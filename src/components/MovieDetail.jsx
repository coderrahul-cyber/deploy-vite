import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadmovie, removemovie } from '../store/actions/movieAction'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { asset } from '../assets/assets'
import Loader from '../pages/Loader'
import HorizontalCards from './HorizontalCards'
import Info from './Info'

function MovieDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } =  useSelector((state) => state.movie);

  useEffect(() => {

    dispatch(asyncloadmovie(params.id))
    return () => {
      console.log("Unmount")
      dispatch(removemovie())
    }

  }, [params.id ])
  return info ? (

    <div  style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
      backgroundSize: 'cover',
      backgroundPosition: "center"
<<<<<<< HEAD
    }} className=' flex flex-col gap-4 bg-[#1F1E24] text-white w-[100ddvw] px-1 min-h-[100ddvw] '>
=======
    }} className=' flex flex-col gap-4 bg-[#1F1E24] text-white w-[100ddvw] px-1 min-h-[100dvh] '>
>>>>>>> b932c11d5bcf6ea4be43837466e6c7d2a1abaa83
      {/* px-3 py-4 */}
      <nav className='w-full bg-white/15 border-[1px]  mt-3   px-2 py-4 rounded-lg flex justify-between items-center sm:grid sm:grid-cols-[0.3fr_2fr_2fr_2fr_1fr]  '>
        <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-400 hover:text-white"></i>
        <a target='_blank' href={info.externalId.wikidata_id ? `https://www.wikidata.org/wiki/${info.externalId.wikidata_id}` : "/not-found"}><i className="ri-global-fill text-2xl pr-2"></i><span className='hidden sm:inline-block'>WIkIPEDIA</span></a>
        <a target='_blank' href={info.details.homepage ? info.details.homepage : "/not-found"}><i className="ri-external-link-fill text-2xl pr-2"></i><span className='hidden sm:inline-block'>OFFICAL LINK</span></a>
        <a target='_blank' href={info.externalId.imdb_id ? `https://www.imdb.com/title/${info.externalId.imdb_id}` : "/not-found"}><i className="ri-error-warning-line text-2xl pr-2"></i><span className='hidden sm:inline-block'>IMDB</span></a>
        <Link to="/deploy-vite">
          <img className='w-6 cursor-pointer' src={asset.logo} alt="" />
        </Link>
      </nav>


     <Info info={info} />

      <div className="recommandation px-3   w-full h-max">
      <h1 className='mt-2 w-max text-3xl px-4 font-fon border-b-[1px] border-zinc-400 '>Recommendations</h1>
      

        <HorizontalCards data={info.recommendation ? info.recommendation : info.similar}
 />

      </div>

      <Outlet/>


    </div>
  ) : <Loader />
}

export default MovieDetail
