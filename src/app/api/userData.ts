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



export const getUserData = async () => {
  try {
    const res = await instance.get('/api/user/me')
    return res.data
  } catch (err) {
    console.log(err, 'err axios get userData err')
  }
}

export const postUserProfile = async (userProfile: File) => {
  const formData = new FormData();
  formData.append("image", userProfile, "이");

  try {
    const res = await instance.post('/api/image/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(res)
    return res.data
  } catch (err) {
    console.log(err, 'err axios post user profile')
  }
}




// 회원탈퇴 사유 불러오기
export const getUserDeleteReason = async () => {
  try {
    const res = await instance.get('/api/my-page/account-deletion-reasons')

    console.log(res)
    return res.data
  } catch (err) {
    console.log(err, 'err axios get user delete reason fail')
  }
}

interface delDataProps {
  deletionReasonId: number | string,
  details: null | string
}

// 회원탈퇴
export const delUserData = async (delData: delDataProps) => {
  try {
    const res = await instance.delete('/api/user/me', {
      headers: headers,
      data: delData
    })
    return res.data
  } catch (err) {
    console.log(err, 'err axios get userData err')
  }
}

