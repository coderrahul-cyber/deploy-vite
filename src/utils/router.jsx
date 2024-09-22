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
    {path : '/' , element: <Home/> },
    {path:'/trending' , element : <Trending/>},
    {path:'/popular' , element : <Popular/>},
    {path:'/movies' , element : <Movies/> ,},
    {path:'/tv-show' , element : <TvShow/>},
    {path:'/people' , element : <People/>},
    {path: "/movie/:id" , element :<MovieDetail/>,
        children:[
            {path:"videos" , element:<Trailer/>}
        ]
    },
    {path: "/tv/:id" , element :<TvDetails/> ,
        children:[
            {path:"videos" , element:<Trailer/>}
        ]
    },
    {path: "/person/:id" , element :<PersonDetail/>},
    {path: "/not-found" , element :<NotFound/>},
    {path: "*" , element :<NotFound/>},






])

export default router ;