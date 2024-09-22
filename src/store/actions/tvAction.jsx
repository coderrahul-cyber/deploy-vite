export { removetv  } from "../Reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../Reducers/tvSlice";


export const asyncloadtv = (id)=>async (dispatch , getState)=>{
    try {
        const details = await axios.get(`/tv/${id}`);//gives the deatil of the tv
        const externalId =await axios.get(`/tv/${id}/external_ids`);// provide external resouces of tv
        const recommendation =await axios.get(`/tv/${id}/recommendations`);//recommendation movies
        const similar =await axios.get(`/tv/${id}/similar`);
        const videos =await axios.get(`/tv/${id}/videos`);
        const translations=await axios.get(`/tv/${id}/translations`);
        const watchProvider =await axios.get(`/tv/${id}/watch/providers`);
        let data ={
            details : details.data ,
            externalId : externalId.data,
            recommendation : recommendation.data.results,
            similar:similar.data.results,
            translations : translations.data.translations.map((item ,index)=> item.english_name) ,
            videos : videos.data.results.find( m => m.type === "Trailer") ,
            watchProvider :watchProvider.data.results.IN || watchProvider.data.results.US
        }
        dispatch(loadtv(data));
        console.log(data)

    } catch (error) {
        console.log(error);
        
    }
}

