import instance, {headers} from "@/app/api/axios";
import {useGoodsDetail, useUserPostGoodsData} from "@/app/zustand/goodsStore";


export const getMainPageGiftList = async () => {
    try {
        const res = await instance.get(`/api/user/me/gift-list?page=1`,{headers})
        return res.data
    } catch (err) {
        console.error('fail get main page gift list  ', err)
    }
}


export const getSelectGoodsGiftList = async (categoryId: number, priceBelow: number ) => {
    try {
        const res = await instance.get(`/api/product/shopping-category/${categoryId}?page=1&numInPage=1000&priceBelow=${priceBelow}`,
            {headers})
        console.log(res)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}


// 선물 리스트 만드는거 번들링하기

interface BundleListProps {
    categoryId: number
    productId: number
}

export const postBundleList = async (goodsList:BundleListProps[]) => {
    try {
        const res = await instance.post(`/api/gift-list/final-before-submit`,
            goodsList, {headers})
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}



interface categoriesWithProductsProps {
    categoryId: number
    receiptType: string,
    productIds: number[]
}

interface GiftListProps {
    imageFileName?: string,
    availableAt?: string,
    expiredAt?: string,
    anniversaryId?: number
    categoriesWithProducts?: categoriesWithProductsProps[]
}


// 선물리스트 생성
export const postGiftList = async (postData: any) => {

    console.log(useUserPostGoodsData.getState().categoriesWithProducts)
    try {
        const res = await instance.post(`/api/gift-list`,
            postData, {headers})
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}

// giftList page


export const getGiftListDetail = async (giftLIstId: number) => {
    try {
        const res = await instance.get(`/api/gift-list/${giftLIstId}/info`,
            {headers})
        console.log(res)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}

export const getGiveGiftList = async () => {
    try {
        const res = await instance.get(`/api/gift-list-letter/product/receiver/me`,
            {headers})
        console.log(res)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}

export const getSendGiftList = async () => {
    try {
        const res = await instance.get(`/api/gift-list-letter/product/receiver/me`,
            {headers})
        console.log(res)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}





