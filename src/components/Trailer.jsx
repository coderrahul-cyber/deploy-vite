import ReactPlayer from 'react-player'
import {  useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../pages/NotFound'

function Trailer() {
    const {pathname} = useLocation();
    
    const category = pathname.includes("movie") ? "movie" : "tv";
    console.log(category ,pathname)
    const ytv = useSelector(state => state[category].info.videos)
    console.log(category , ytv)
    const navigate = useNavigate();


  return ytv != undefined ? (
    <div className='absolute bg-[rgba(0,0,0,0.8)]   w-full h-full '>
        <div className="w-[100vw] h-[100vh] relative flex items-center justify-center">

                <i onClick={() => navigate(-1)} className="ri-close-large-line cursor-pointer absolute sm:top-36 sm:right-[20%] top-[30%]  right-2 text-xl sm:text-3xl text-zinc-300 hover:text-white"></i>
      <ReactPlayer   controls={true}  height={window.innerWidth <= 430 ?300:600} width={1080} url={`https://www.youtube.com/watch?v=${ytv.key}`} />

        </div>
    </div>
  ): <NotFound/>
}

export default Trailer
