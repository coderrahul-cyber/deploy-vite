export { removemovie  } from "../Reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../Reducers/movieSlice";


export const asyncloadmovie = (id)=>async (dispatch , getState)=>{
    try {
        const details = await axios.get(`/movie/${id}`);//gives the deatil of the movie
        const externalId =await axios.get(`/movie/${id}/external_ids`);// provide external resouces of movie
        const recommendation =await axios.get(`/movie/${id}/recommendations`);//recommendation movies
        const similar =await axios.get(`/movie/${id}/similar`);
        const videos =await axios.get(`/movie/${id}/videos`);
        const translations=await axios.get(`/movie/${id}/translations`);
        const watchProvider =await axios.get(`/movie/${id}/watch/providers`);
        let data ={
            details : details.data ,
            externalId : externalId.data,
            recommendation : recommendation.data.results,
            similar:similar.data.results,
            translations : translations.data.translations.map((item ,index)=> item.english_name) ,
            videos : videos.data.results.find( m => m.type === "Trailer") ,
            watchProvider :watchProvider.data.results.IN || watchProvider.data.results.US
        }
        dispatch(loadmovie(data));
        console.log(data)

    } catch (error) {
        console.log(error);
        
    }
}

