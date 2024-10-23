import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'


HorizontalCards.propTypes ={
    data : PropTypes.any ,
}
function HorizontalCards({ data }) {
    const {pathname} = useLocation()
    return data.length !== 0 ? (
        <div className='w-full   p-4 h-max '>
            
            <div className="w-[100%]     grid sm:grid-cols-2 lg:grid-cols-6   gap-5 ">

                {data &&  data.map((item, index) => (
                    <Link to={item.season_number == undefined ? `/deploy-vite/${item.media_type }/${item.id}` : pathname} key={index} className={`w-full bg-zinc-900  overflow-hidden pb-2 rounded-lg     mr-5 `}>
                        <img className='sm:h-48 h-[30dvh] w-full  object-cover object-center' src={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path || item.poster_path } `} alt="" />
                        <h1 className='text-xl text-center py-2  line-clamp-1 font-semibold  text-white'>{item.name || item.title || item.original_name || item.original_title}</h1>
                        {item.season_number == undefined || !item.air_date ?  
                        <>
                        <hr className='border-zinc-400 ' />
                          <p className='mt-3 w-full px-2 text-[0.8em] h-full '>
                              {  item.overview ? `${item.overview.slice(0,100)}` :  "No description Found"}...
                              <span className='text-blue-300'>more </span></p>
                        </>
                           :<></>
                    }
                      

                    </Link>
                ))}

            </div>
        </div>
    ):<div><h1 className='w-full h-full text-3xl font-trah text-center mt-20'>Not Recommendation</h1></div>
}

export default HorizontalCards
