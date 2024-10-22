import  { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import axios from '../utils/axios';
import TopNav from '../components/TopNav'
import Header from '../components/Header';
import HorizontalCards from '../components/HorizontalCards';
import Loader from './Loader';


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
      setTrending(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    wallpaper && getHeader()
    getTrending()
  },[])


  return wallpaper && trending  ? (
    <div   className=' bg-[#100c08] text-slate-200 flex   shadow-2xl shadow-white  w-[100vw] h-screen '>
      <SideBar />
      <div className="sm:w-[80%] sm:pl-[20vw]   min-w-[100%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />
        <h1 className='mt-2 text-3xl px-4 font-fon'>Trending Now..</h1>
        <HorizontalCards data={trending} />
      </div>

    </div>
  ) : <Loader />
}

export default Home
