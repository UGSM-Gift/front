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


interface PostGoodsDataArrProps {
    categoryId: number,
    receiptType: "ALL" | "ONLY_ONE" | null
    productIds: number[]
}


interface PostGoodsDataProps {
    categoriesWithProducts: PostGoodsDataArrProps[]
    imageFileName?: string,
    availableAt?: string,
    expiredAt?: string,
    anniversaryId?: number,
}


export const useUserPostGoodsOnlyProductData  = create<PostGoodsDataProps>((set)=> ({
    categoriesWithProducts: []
}))



interface singleFilterDataProps {
    categoryId: number
    productIds: number[]
}

interface useUserPostGoodsSingleFilterDataProps {
    singleFilterData: singleFilterDataProps[]
}

export const useUserPostGoodsSingleFilterData  = create<useUserPostGoodsSingleFilterDataProps>((set)=> ({
    singleFilterData: []
}))



export const useUserPostGoodsData  = create<PostGoodsDataProps>((set)=> ({
    imageFileName: "f54c871e-ec0c-4243-aae2-bca951065958",
    availableAt: "2024-01-02",
    expiredAt: "2024-03-27",
    anniversaryId: 8,
    categoriesWithProducts: []
}))


interface SelectGiftListDetailProps {
    listId: number
}
export const useSelectGiftListDetail = create<SelectGiftListDetailProps>((set)=> ({
    listId: 0
}))



