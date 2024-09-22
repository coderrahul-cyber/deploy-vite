import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Trending from "../pages/Trending";
import Popular from "../pages/Popular";
import Movies from "../pages/Movies";
import TvShow from "../pages/TvShow";
import People from "../pages/People";
import MovieDetail from "../components/MovieDetail";
import Home from "../pages/Home";
import TvDetails from "../components/TvDetails";
import PersonDetail from "../components/PersonDetail";
import NotFound from "../pages/NotFound";
import Trailer from "../components/Trailer";

const router = createBrowserRouter([
    {path : '/deploy-vite/' , element: <Home/> },
    {path:'/deploy-vite/trending' , element : <Trending/>},
    {path:'/deploy-vite/popular' , element : <Popular/>},
    {path:'/deploy-vite/movies' , element : <Movies/> ,},
    {path:'/deploy-vite/tv-show' , element : <TvShow/>},
    {path:'/deploy-vite/people' , element : <People/>},
    {path: "/deploy-vite/movie/:id" , element :<MovieDetail/>,
        children:[
            {path:"videos" , element:<Trailer/>}
        ]
    },
    {path: "/deploy-vite/tv/:id" , element :<TvDetails/> ,
        children:[
            {path:"videos" , element:<Trailer/>}
        ]
    },
    {path: "/deploy-vite/person/:id" , element :<PersonDetail/>},
    {path: "/deploy-vite/not-found" , element :<NotFound/>},
    {path: "*" , element :<NotFound/>},






])

export default router ;