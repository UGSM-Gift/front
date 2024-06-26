
import instance from "@/app/api/axios";

export const getRecommendedProduct = async () => {
    try {
        const res = await instance.get('/api/product/recommended')
        return res.data
    } catch (err) {
        console.log(err, 'err axios getRecommendedProduct')
    }
}



// 진행중인 선물리스트 목록
export const getGiftList = async () => {
    try {
        const res = await instance.get('/api/user/me/gift-list?page=1')

        return res.data
    } catch (err) {
        console.log(err, 'err axios get gift list ')
    }
}

