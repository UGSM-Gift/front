import {create} from "zustand";

interface CategoryProps {
    id: number
    name: string
    imageUrl: string
}

interface UserCategoryProps {
    categoryArr: CategoryProps[]
}

export const useUserCategory = create<UserCategoryProps>((set)=> ({
    categoryArr: [],
}))


interface GoodsArrProps {
    id: number
    name: string
    price: number
    thumbnailImgUrl: string
    brandName: string
    freeShipping: boolean
    isSoldOut: boolean
    buyingUrl: string

}


export const useGoodsDetail = create<GoodsArrProps>((set)=> ({
    id: 0,
    name: "",
    price: 0,
    thumbnailImgUrl: "",
    brandName: "",
    buyingUrl: "",
    freeShipping: false,
    isSoldOut: false
}))


interface SelectGoods {

}

export const useUserSelectGoods = create<GoodsArrProps>((set)=> ({
    id: 0,
    name: "",
    price: 0,
    thumbnailImgUrl: "",
    brandName: "",
    buyingUrl: "",
    freeShipping: false,
    isSoldOut: false
}))


