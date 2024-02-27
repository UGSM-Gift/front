import instance, { headers } from './axios';
import axios from "axios";

interface PutUserDataProps {
  name: string | null
  nickname: string | null
  mobile: string | null
  birthdate: string | null
  gender: string | null
  email: string | null
}

// 유저데이터 업데이트
export const PutUserData = async (userData: PutUserDataProps) => {
  try {
    const response = await instance.put("/api/user/me", JSON.stringify(userData), { headers })
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
    return false;
  }
};


