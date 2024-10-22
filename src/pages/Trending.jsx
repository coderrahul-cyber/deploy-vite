import  { useEffect,  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav';
import DropDown from '../components/DropDown';
import axios from '../utils/axios';
import Card from '../components/Card';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';


function Trending() {
    const navigate =useNavigate();
    const [category , setCategory] = useState("all");
    const [duration , setDuration] = useState("day");
    const [trending , settrending] = useState([]);
    const [page ,setpage]=useState(1);
    const [hasmore , sethasmore] =useState(true)
    

    const getTrending = async () => {
      try {
        // Fetch both pages in parallel to save time
        const [response1, response2] = await Promise.all([
          axios.get(`trending/${category}/${duration}?page=${page}`),
          axios.get(`trending/${category}/${duration}?page=${page + 1}`)
        ]);
        // Combine the results from both pages
        const data = [...response1.data.results, ...response2.data.results];    
        // Update the state with the combined results
        settrending((prevState) => [...prevState, ...data]);
        // Check if there are more pages to fetch
        const totalPages = response1.data.total_pages; // Assuming both responses have the same total_pages
        if (page + 1 >= totalPages) {
          sethasmore(false); // No more pages to load
        } else {
          setpage((prevPage) => prevPage + 2); // Increment by 2 as you fetched two pages
        }
      } catch (error) {
        console.error(error);
        sethasmore(false); // Stop further loading if there's an error
      }
    };
      useEffect(()=>{
        settrending([]);
        setpage(1);
        sethasmore(true);
        getTrending();
      },[category,duration])
  return trending.length > 0  ? (
 
    <div className='w-screen px-5 pt-3 min-h-screen bg-[#1F1E24]'>
        <div className="w-full    flex  gap-2 items-center">
        <i onClick={()=> navigate(-1)} className="ri-arrow-left-fill cursor-pointer sm:text-xl text-zinc-400 hover:text-white"></i>
            <h1 className='sm:text-4xl text-2xl tracking-wide font-shadd  text-zinc-300 '>Trending</h1>
            {window.innerWidth <= 430 ?<></> :<TopNav/>}
            <DropDown title="Category" option={["movie" , "tv" , "all"]} func={(e)=> setCategory(e.target.value)}/>
            <DropDown title="Duration" option={["week" , "day"]} func={(e)=>setDuration(e.target.value)} />
        </div>
        <hr className='border-zinc-500 rounded-lg h-1 my-2 mx-auto   bg-zinc-500' />
        <InfiniteScroll
        dataLength={trending.length}
        hasMore={hasmore}
        next={getTrending}
        loader={<BeatLoader color="#6556CD" />}
        >
       <Card data={trending} title={category}/>
        </InfiniteScroll>
    </div>
  ):<Loader/>
}
export default Trending
