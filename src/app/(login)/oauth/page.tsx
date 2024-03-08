'use client';
import axios from 'axios';
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Oauth = () => {
    const router = useRouter();
    //  user가 있으면 메인페이지로 이동




    //   인가 코드 전송
    async function getUser() {
        const accessToken = window.localStorage.getItem('accessToken');

        if (!accessToken) return alert('토큰 없음');

        try {
            const response = await axios.get(`https://www.ugsm.co.kr/api/user/me`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const userChecked = response.data.data.mobileVerified;

            console.log(userChecked)

            if (userChecked) {
                router.replace('/main');
            } else {
                router.replace('/signup');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {
        getUser()
    }, [])

    return <div>로그인중입니다.</div>;
};

export default Oauth;
