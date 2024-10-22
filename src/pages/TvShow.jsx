import  { useState, useEffect } from 'react';
import axios from '../utils/axios';
import TopNav from '../components/TopNav';
import DropDown from '../components/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function TvShow() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvshow, setShow] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getTvShow = async () => {
        try {
          // Fetch both pages in parallel to save time
          const [response1, response2] = await Promise.all([
            axios.get(`/tv/${category}?page=${page}`),
            axios.get(`/tv/${category}?page=${page + 1}`)
          ]);
          // Combine the results from both pages
          const data = [...response1.data.results, ...response2.data.results];      
          // Update the state with the combined results
          setShow((prevState) => [...prevState, ...data]);
          // Check if there are more pages to fetch
          const totalPages = response1.data.total_pages; // Assuming both responses have the same total_pages
          if (page + 1 >= totalPages) {
            setHasMore(false); // No more pages to load
          } else {
            setPage((prevPage) => prevPage + 2); // Increment by 2 as you fetched two pages
          }
        } catch (error) {
          console.error(error);
          setHasMore(false); // Stop further loading if there's an error
        }
      };

    // const getTvShow = async () => {
    //     try {
    //         const { data } = await axios.get(`/tv/${category}?page=${page}`);

    //         console.log(data);

    //         // Update the state with new data
    //         setShow((prevState) => [...prevState, ...data.results]);

    //         // Check if there are more pages
    //         if (page >= data.total_pages) {
    //             setHasMore(false);  // No more pages to load
    //         } else {
    //             setPage(page + 1);  // Increase page for next load
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setHasMore(false);  // Stop loading in case of an error
    //     }
    // };

    useEffect(() => {
        setShow([]);
        setPage(1);
        setHasMore(true);
        getTvShow();
    }, [category]);

    return tvshow.length > 0 ? (


        <div  className='w-screen px-10 pt-3 min-h-screen bg-[#1F1E24]'>
            <div className="w-full flex gap-2 items-center">
                <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-400 hover:text-white"></i>
                <h1 className='text-4xl tracking-wide font-shadd text-zinc-300'>Tv-Show</h1>
                {window.innerWidth <= 430 ?<></> :<TopNav/>}
                <DropDown title="Category" option={["on_the_air", "popular", "top_rated", "airing_today"]} func={(e) => setCategory(e.target.value)} />
            </div>
            <hr className='border-zinc-500 rounded-lg h-1 my-2 mx-auto bg-zinc-500' />
            <InfiniteScroll
                dataLength={tvshow.length}
                hasMore={hasMore}
                next={getTvShow} 
                loader={<span className='w-full flex justify-center'><BeatLoader color="#6556CD" /></span>}
            >
                <Card data={tvshow} title="tv" />
            </InfiniteScroll>
        </div>
    ) : <Loader />;
}

export default TvShow;
