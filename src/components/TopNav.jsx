import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'

function TopNav() {
    // 881cf5b22cad93d8168fbb9b9a7364fa
    const [query , setQuery]= useState("");
    const [ search , setSearch] = useState([]);



    const getSearchs = async ()=>{
        try {
    
          const {data} = await axios.get(`/search/multi?query=${query}`)
          setSearch(data.results)
        //   console.log(data.results)
          
        } catch (error) {
          console.log(error)
          
        }
      }
    
      useEffect(()=>{
    
        getSearchs();
    
      },[query])
    return (
        <div className='w-full items-center px-3 py-4 justify-center   flex  gap-5 relative '>

            <i className="ri-search-line text-xl text-white"></i>
            <input  onChange={(e)=> setQuery(e.target.value)} value={query} className='w-[50%] bg-transparent  outline-none focus:bg-zinc-500 focus:text-white py-2   border-zinc-500 rounded-md px-3 font-semibold' type="text" placeholder='Search Engine' />
            {query.length > 0 &&<i onClick={()=>setQuery("")} className="ri-close-large-line cursor-pointer text-white"></i> }

            <div className=" glass z-50  absolute w-[50%] flex flex-col gap-3  mt-4  max-h-72 top-[90%]  overflow-auto ">

           {search.map((item ,index)=>(
             <Link to={`/deploy-vite/${item.media_type}/${item.id}`} key={index} className='flex border-y-[1px] mx-2  peer/h  py-2 hover:shadow-md transition-all ease-in hover:shadow-zinc-400 border-zinc-300 rounded-xl  px-2  items-center gap-4 peer/l'>
             <img className='w-12 h-12  object-scale-down   ' src={ item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.profile_path}` : 'https://www.shutterstock.com/shutterstock/photos/2059817444/display_1500/stock-vector-no-image-available-photo-coming-soon-illustration-vector-2059817444.jpg'} alt="no image" />
             <span className='capitalize     '>{item.name || item.title || item.original_title}</span>
             </Link>
           ))}
               
            </div>


        </div>
    )
}

export default TopNav
