import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

Credits.propTypes= {
    data:PropTypes.any,
    category :PropTypes.any
}
function Credits({data , category}) {
    let ddd;
      data.cast.length > 0 ? ddd = data.cast : ddd = data.crew
    const newd = ddd.filter((image)=>  image.poster_path || image.backdrop_path ) 

  return (
    <div className=' w-[50%] '>
         <h1 className='text-center text-xl my-2 uppercase'>{category} Credits</h1>
         <hr className='h-[1px] my-1'  />
         <div className="section flex font-mono justify-center   flex-wrap gap-2 px-2 py-4">
            {newd.map((item,index)=>(
                <Link to={`/deploy-vite/${category}/${item.id}`}  key={index}>
                <div className="one relative border-[1px] rounded-md min-w-[11vmax]  lg:max-w-20 overflow-x-hidden overflow-y-scroll min-h-[20vmax] lg:h-[20vmax] pb-1 bg-white/20  hover:shadow-2xl shadow-[#BA95F9] transition-all ease-in-out duration-300 ">
                    <img 
                    src={`https://image.tmdb.org/t/p/original/${ item.poster_path || item.backdrop_path }`} alt="" className='w-full max-h-[70%] object-cover object-center' />
                    <h1 className='text-center font-mono uppercase font-semibold'>{item.name || item.title || item.original_name || item.original_title}</h1>
                    <hr className='h-[1px]' />

                    {item.character &&   <p className='text-xs mt-2 px-2'><span className='font-semibold'>Charcter Name :</span>{item.character}</p> }
                   {item.job && <p className='text-xs mt-2 px-2'><span className='font-semibold text-white'>Job :</span>{item.job}</p> }
                    
                    <p className='text-xs mt-1 px-2'><span className='font-semibold'>Popularity :</span>{(item.popularity).toFixed(1)}</p>
                </div>
                </Link>
            ))}
            
         </div>
    </div>
  )
}

export default Credits
