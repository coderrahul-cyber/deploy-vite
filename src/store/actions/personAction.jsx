export { removeperson  } from "../Reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../Reducers/personSlice";


export const asyncloadperson = (id)=>async (dispatch , getState)=>{
    try {
        const details = await axios.get(`/person/${id}`);//gives the deatil of the person
        const externalId =await axios.get(`/person/${id}/external_ids`);// provide external resouces of person
        const credit =await axios.get(`/person/${id}/combined_credits`);// provide external resouces of person
        const tvC =await axios.get(`/person/${id}/tv_credits`);// provide external resouces of person
        const movieC=await axios.get(`/person/${id}/movie_credits`);// provide external resouces of person




        let data ={
            details : details.data ,
            externalId : externalId.data,
            combinedCredits : credit.data,
            tvCredits : tvC.data,
            movieCredits : movieC.data
             
        }
        dispatch(loadperson(data));
    } catch (error) {
        console.log(error);
        
    }
}

