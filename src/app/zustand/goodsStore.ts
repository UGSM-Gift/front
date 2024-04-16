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
    buyingUrl: string
    freeShipping: boolean
    isSoldOut: boolean
    categoryId: number

}

export const useGoodsDetail = create<GoodsArrProps>((set)=> ({
    id: 0,
    name: "",
    price: 0,
    thumbnailImgUrl: "",
    brandName: "",
    buyingUrl: "",
    freeShipping: false,
    isSoldOut: false,
    categoryId: 0
}))



interface GoodsIdProps {
    categoryId: number
    productId: number
}
interface SelectGoods {
    selectGoods: GoodsIdProps[]
}

export const useUserSelectGoods = create<SelectGoods>((set)=> ({
    selectGoods: [],
}))



interface BundleMultiProps {
    categoryId: number
    categoryName: string
    products: GoodsArrProps[]
}

interface BundleDataProps {
    multiple: BundleMultiProps[]
    single: BundleMultiProps[]
}

export const useUserSelectGoodsBundleData = create<BundleDataProps>((set)=> ({
    multiple: [],
    single: []
}))

