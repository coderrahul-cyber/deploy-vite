import React from 'react'
import { Link } from 'react-router-dom'

function Credits({data , category}) {
    let ddd;
      data.cast.length > 0 ? ddd = data.cast : ddd = data.crew
    const newd = ddd.filter((image)=>  image.poster_path || image.backdrop_path ) 
    console.log(newd)

  return (
    <div className=' w-[50%] '>
         <h1 className='text-center'>{category} Credits</h1>
         <hr className='h-[1px]' />


         <div className="section flex justify-center flex-wrap gap-2 px-2 py-4">
            {newd.map((item,index)=>(
                <Link to={`/${category}/${item.id}`}  key={index}>
                <div className="one relative border-2 w-[11vmax] overflow-x-hidden overflow-y-scroll h-[20vmax] pb-1 glass  hover:shadow-2xl shadow-[#BA95F9] transition-all ease-in-out duration-300 ">
                    <img 
                    src={`https://image.tmdb.org/t/p/original/${ item.poster_path || item.backdrop_path }`} alt="" className='w-full max-h-[70%] object-cover object-center' />
                    <h1 className='text-center'>{item.name || item.title || item.original_name || item.original_title}</h1>
                    <hr className='h-[1px]' />

                    {item.character &&   <p className='text-xs mt-2 px-2'><span className='text-zinc-500'>Charcter Name :</span>{item.character}</p> }
                   {item.job && <p className='text-xs mt-2 px-2'><span className='text-zinc-500'>Job :</span>{item.job}</p> }
                    
                    <p className='text-xs mt-1 px-2'><span className='text-zinc-500'>Popularity :</span>{(item.popularity).toFixed(1)}</p>
                </div>
                </Link>
            ))}
            
         </div>
    </div>
  )
}

export default Credits
