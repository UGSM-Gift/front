import instance, {headers} from "@/app/api/axios";
import {useUserPostGoodsData} from "@/app/zustand/goodsStore";



export const getLetterList = async (status: number) => {
    // 생략 시 전체 리스트 불러오기 / NOT_CONFIRMED(아직확인하지 않은것만), CONFIRMED(확인한 것만), DENIED(거절된것만)
    // 0 - 전체 , 1 - 아직 확인하지 않은것 , 3 - 확인한것 , 4 - 거절된것
    let value = ''
    switch (status) {
        case 0:
            value = ''
            break
        case 1:
            value = '/NOT_CONFIRMED'
            break;
        case 2:
            value = '/CONFIRMED'
            break;
        case 3:
            value = '/DENIED'
            break;
    }

    try {
        const res = await instance.get(`/api/gift-list-letter/receiver/me${value}`,
            {headers})
        console.log(res)
        return res.data
    } catch (err) {
        console.log('fail get select goods gift list',err)
    }
}

