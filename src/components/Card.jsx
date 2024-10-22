import { Link } from 'react-router-dom'
import ScrollToTopButton from './ScrllToTop'
import PropTypes from "prop-types"

Card.propTypes= {
    title : PropTypes.string ,
    data:PropTypes.any
}
function Card({ data , title }) {

    return (

        <>
        
        <div id='top' className='text-white pb-20  grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-[10px]'>

            {data && data.map((item, index) => (
                <Link to={`/deploy-vite/${item.media_type || title}/${item.id}`} className='w-full overflow-hidden relative rounded-lg bg-zinc-500  pb-2  text-xs text-center' key={index}>
                    <img className='w-full object-cover object-center' src={item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.profile_path}` : 'https://www.shutterstock.com/shutterstock/photos/2059817444/display_1500/stock-vector-no-image-available-photo-coming-soon-illustration-vector-2059817444.jpg'} alt="" />

                    <h1 className='mt-2 font-trah tracking-wide '>
                        {item.name || item.title || item.original_name || item.original_title}
                    </h1>
                     
                    {item.vote_average ? <p className='text-white bg-green-500 pt-1 w-7 h-7 text-center absolute z-30 top-0 text-[12px]'>{(item.vote_average * 10).toFixed()}%</p>:<></>}

                </Link>
            ))}



        </div>

    <ScrollToTopButton />
        </>
    )
}

export default Card
