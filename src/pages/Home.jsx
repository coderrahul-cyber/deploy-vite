import  { useEffect, useRef, useState } from 'react'
import SideBar from '../components/SideBar'
import axios from '../utils/axios';
import TopNav from '../components/TopNav'
import Header from '../components/Header';
import HorizontalCards from '../components/HorizontalCards';
import Loader from './Loader';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';


function Home() {
  const [wallpaper, sewallpaper] = useState([]);
  const [trending, setTrending] = useState([]);


  const getHeader = async () => {
    try {

      const { data } = await axios.get(`trending/all/day`)
      let random = data.results[(Math.random() * data.results.length).toFixed()]
      sewallpaper(random)
      // console.log(random)

    } catch (error) {
      console.log(error)
    }
  }

  const getTrending = async () => {
    try {

      const { data } = await axios.get(`trending/all/day`)
      // console.log(data.results)
      setTrending(data.results)


    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    wallpaper && getHeader()
    getTrending()
  },[])
  const containerRef = useRef();


  return wallpaper && trending  ? (
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
      touchMultiplier: 2.5,
      }
    }
    watch={[]}
    containerRef={containerRef}
    >


    <div data-scroll-container  className=' bg-[#1F1E24] text-slate-300 flex   shadow-2xl shadow-white  w-[100vw] h-screen '>
      <SideBar />
      <div className="sm:w-[80%] sm:pl-[20vw]   min-w-[100%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />
        <h1 className='mt-2 text-3xl px-4 font-fon'>Trending Now..</h1>
        <HorizontalCards data={trending} />
      </div>

    </div>
    </LocomotiveScrollProvider>
  ) : <Loader />
}

export default Home
