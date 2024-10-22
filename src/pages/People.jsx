import  { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import TopNav from '../components/TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import ScrollToTopButton from '../components/ScrllToTop';



function People() {
    const navigate = useNavigate();
    const [person, setperson] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getPerson= async () => {
        try {
          // Fetch both pages in parallel to save time
          const [response1, response2] = await Promise.all([
            await axios.get(`/person/popular?page=${page}`),
            await axios.get(`/person/popular?page=${page+1}`)
          ]);
            
          // Combine the results from both pages
          const data = [...response1.data.results, ...response2.data.results];
          console.log(data)
      
          // Update the state with the combined results
          setperson((prevState) => [...prevState, ...data]);
      
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

    // const getPerson = async () => {
    //     try {
    //         const { data } = await axios.get(`/person/popular?page=${page}`);

    //         console.log(data);

    //         // Update the state with new data
    //         setperson((prevState) => [...prevState, ...data.results]);

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
    const containerRef = useRef();

    useEffect(() => {
        setperson([]);
        setPage(1);
        setHasMore(true);
        getPerson();
    }, []);
    return person.length > 0 ? (
        <LocomotiveScrollProvider
        options={{
          smooth: true,
          lerp: 0.1, // Lower the value for smoother scrolling (default is 0.1)
          multiplier: 1, // Adjust the scroll speed (slightly faster)
          smoothMobile: true, // Enable smooth scrolling on mobile as well
          inertia: 1, // Controls the scroll inertia (closer to 1 is smoother)
    
        }}
        watch={[]}
        containerRef={containerRef}
      >
        <div data-scroll-container className='w-screen px-10 pt-3 min-h-screen bg-[#1F1E24]'>
            <div className="w-full flex gap-2 items-center">
                <i onClick={() => navigate(-1)} className="ri-arrow-left-fill cursor-pointer text-xl text-zinc-400 hover:text-white"></i>
                <h1 className='text-4xl tracking-wide font-shadd text-zinc-300'>People</h1>
                <TopNav />
            </div>
            <hr className='border-zinc-500 rounded-lg h-1 my-2 mx-auto bg-zinc-500' />
            <ScrollToTopButton/>
            <InfiniteScroll
                dataLength={person.length}
                hasMore={hasMore}
                next={getPerson} 
                loader={<span className='w-full flex justify-center'><BeatLoader color="#6556CD" /></span>}
            >
                <Card data={person} title="person" />
            </InfiniteScroll>
        </div>
      </LocomotiveScrollProvider>
    
    ) : <Loader />;
}

export default People
