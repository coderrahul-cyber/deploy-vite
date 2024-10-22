import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import TopNav from '../components/TopNav';
import DropDown from '../components/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';



function Movies() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movies, setMovies] = useState([]);
    const [page, setpage] = useState(1);
    const [hasmore , sethasmore] =useState(true);

    const getMovies = async () => {
        try {
          // Fetch both pages in parallel to save time
          const [response1, response2] = await Promise.all([
            await axios.get(`/movie/${category}?page=${page}`),
            await axios.get(`/movie/${category}?page=${page+1}`)
            ]);
      
          // Log the responses
      
          // Combine the results from both pages
          const data = [...response1.data.results, ...response2.data.results];      
          // Update the state with the combined results
          setMovies((prevState) => [...prevState, ...data]);
      
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

    // const getMovies = async () => {
    //     try {

    //         const { data } = await axios.get(`/movie/${category}?page=${page}`)

    //         console.log(data)
    //         setMovies((prevState) => [...prevState, ...data.results])
    //         if(page >= data.total_pages){
    //             sethasmore(false);
    //           }else{
    //             setpage(page +1)
    //           }
    //         } catch (error) {
    //           console.log(error)  
    //           sethasmore(false)
    //         }
    // }

    useEffect(() => {
        setMovies([])
        setpage(1);
        sethasmore(true);
        getMovies();
    }, [category])


    return movies.length > 0 ? (

        <div data-scroll-container className='w-screen px-5 pt-3 min-h-screen bg-[#1F1E24]'>
            <div className="w-full    flex  gap-2 items-center">
                <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-400 hover:text-white"></i>
                <h1 className='text-4xl tracking-wide font-shadd  text-zinc-300 '>Movies</h1>
                {window.innerWidth <= 430 ?<></> :<TopNav/>}
                <DropDown title="Category" option={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setCategory(e.target.value)} />
            </div>
            <hr className='border-zinc-500 rounded-lg h-1 my-2 mx-auto   bg-zinc-500' />
            <InfiniteScroll
                dataLength={movies.length}
                hasMore={hasmore}
                next={getMovies}
                loader={<span className='w-full flex justify-center'><BeatLoader color="#6556CD" /></span>}
            >

                <Card data={movies} title="movie" />

            </InfiniteScroll>

        </div>    
    ) : <Loader />
}

export default Movies
