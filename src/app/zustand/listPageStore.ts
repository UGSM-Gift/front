import { create } from 'zustand';
import {getAnniversaryList} from "@/app/api/anniversary";
import {number} from "prop-types";
import instance, {headers} from "@/app/api/axios";


interface ListPageStoreProps {
    presentArr: any[]
}

export const useListPageStore = create<ListPageStoreProps>((set) => ({
    presentArr: [
        {
            listId: 1,
            createdAt: "2024-04-20 23:08:14",
            availableAt: "2024-04-20 23:08:14",
            expiredAt: "2024-04-21 23:59:59",
            anniversaryImageUrl: "https://cloudfront.ugsm.co.kr/anniversary/ic-party-popper.png",
            anniversaryTitle: "생일",
            selectedProductsNumber: 0,
            receivedProductsNumber: 0,
        }
    ]
}));
