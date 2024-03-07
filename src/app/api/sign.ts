import instance, {headers} from "@/app/api/axios";




export const getRandomNickname = async () => {
    try {
        const response = await instance.get("/api/user/random-nickname")
        return response.data
    } catch (error) {
        console.error(error);
        return false;
    }
};


