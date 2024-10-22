import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { asset } from '../assets/assets'
import Loader from '../pages/Loader'
import HorizontalCards from './HorizontalCards'
import { removetv , asyncloadtv } from '../store/actions/tvAction'
import Info from './Info'

function TvDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } =  useSelector((state) => state.tv);
  useEffect(() => {

    dispatch(asyncloadtv(params.id))
    return () => {
      dispatch(removetv())
    }

  }, [params.id ])
  return info ? (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
      backgroundSize: 'cover',
      backgroundPosition: "center"
    }} className=' flex flex-col gap-4 bg-[#1F1E24] text-white w-[100dvw] min-h-[100dvh] '>
      {/* px-3 py-4 */}
      <nav className='w-full bg-white/20 border-[1px] mt-3    px-2 py-4 rounded-lg flex justify-between items-center sm:grid sm:grid-cols-[0.3fr_2fr_2fr_2fr_1fr]  '>
        <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-400 hover:text-white"></i>
        <a target='_blank' href={info.externalId.wikidata_id ? `https://www.wikidata.org/wiki/${info.externalId.wikidata_id}` : "/not-found"}><i className="ri-global-fill text-2xl sm:pr-2"></i><span className='hidden sm:inline-block'>WIkIPEDIA</span></a>
        <a target='_blank' href={info.details.homepage ? info.details.homepage : "/not-found"}><i className="ri-external-link-fill text-2xl sm:pr-2"></i><span className='hidden sm:inline-block'>OFFICIAL LINKS</span></a>
        <a target='_blank' href={info.externalId.imdb_id ? `https://www.imdb.com/title/${info.externalId.imdb_id}` : "/not-found"}><i className="ri-error-warning-line text-2xl sm:pr-2"></i><span>IMDB</span></a>
        <Link to="/deploy-vite/">
          <img className='w-6 cursor-pointer' src={asset.logo} alt="" />
        </Link>
      </nav>


    <Info info={info} />

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
  ) : <Loader />
}

export default TvDetails
