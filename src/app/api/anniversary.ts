import instance, { headers } from './axios';
import axios from "axios";


export const getAnniversaryImage = async () => {
    try {
        const response = await instance.get("/api/anniversary-images", { headers })
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
        return false;
    }
};


interface addUserAnniversaryProps {
    name: string
    imageId: number
    date: string
}
export const postAnniversary = async (addUserAnniversary: addUserAnniversaryProps) => {
    try {
        const response = await instance.post("/api/user/me/anniversary", JSON.stringify(addUserAnniversary) ,{ headers })
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
        return false;
    }
}


export const getAnniversaryList = async (date : string) => {

    try {
        const response = await instance.get(`/api/user/me/anniversary?yearMonth=${date}`, { headers })
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
        return false;
    }
};


