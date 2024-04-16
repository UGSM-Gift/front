'use client'
import DefaultSelect from "@/app/_component/DefaultSelect";
import Image from "next/image";
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import DefaultButton from "@/app/_component/DefaultButton";
import './selectGoods.scss'
import {useEffect, useState} from "react";
import TestPageHeader from "@/app/_component/TestPageHeader";
import {useAddCategoryList, useCategoryStore, useTestStore} from "@/app/zustand/testStore";
import {getSelectGoodsGiftList, postBundleList} from "@/app/api/giftList";
import {
    useGoodsDetail,
    useUserCategory,
    useUserSelectGoods,
    useUserSelectGoodsBundleData
} from "@/app/zustand/goodsStore";
import {UserJobProps} from "@/app/type";
import PriceFilter from "@/app/_component/PriceFilter";
import NavLayout from "@/app/_component/NavLayout";
import {useRouter} from "next/navigation";
import CategoryDialog from "@/app/(main)/test/_component/CategoryDialog";

const SelectGoods = () => {


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

    const [goodsArr, setGoodsArr] = useState<GoodsArrProps[]>([
        {
            id: 27556,
            name: "포켓몬스터 휴식 타임 봉제인형 우파",
            price: 18000,
            thumbnailImgUrl: "https://shop-phinf.pstatic.net/20240214_160/170788780461193U1p_PNG/8809945331918.png?type=f480_480",
            brandName: "포켓몬 스토어 온라인",
            buyingUrl: "https://m.shopping.naver.com/gift/products/9949963691",
            freeShipping: false,
            isSoldOut: false,
            categoryId: 1
        },
    ])


    const categoryId = useCategoryStore(state => state.categoryId); // 상태 구독
    const categoryArr = useUserCategory(state => state.categoryArr); // 상태 구독

    const [priceBelow, setPriceBelow] = useState<number>(200000)

    interface NavCategoryProps {
        id: number
        name: string
    }


    const [navCategoryList, setNavCategoryList] = useState<NavCategoryProps[]>([])
    const [selectedNavCategoryId, setSelectedNavCategoryId] = useState(0)


    const getGoodsList = async () => {

        try {
            // 상단 카테고리 버튼 생성
            setNavCategoryList(categoryArr)


            // 하단 상품리스트 생성
            const data = await getSelectGoodsGiftList(categoryArr[0].id, priceBelow)
            setSelectedNavCategoryId(categoryArr[0].id)
            setGoodsArr(data.data)
            console.log(data)
        } catch (err) {
            console.log(err, 'fail get goods list tsx')
        }
    }


    const clickNavCategory = async (item: NavCategoryProps) => {
        try {
            const data = await getSelectGoodsGiftList(item.id, priceBelow)
            setGoodsArr(data.data)
            setSelectedNavCategoryId(item.id)
        } catch (err) {
            console.log(err, 'fail click nav category tsx')
        }

        console.log(item)
    }


    const clickSelectAll = () => {
        setCategoryDialogState(true)
    }


    const [priceFilterState, setPriceFilterState] = useState(false)
    const clickSelectPrice = () => {
        setPriceFilterState(!priceFilterState)
    }


    const clickPriceFilterRadio = async (value: string) => {
        try {
            let price = 0
            switch (value) {
                case '3만원 이하':
                    price = 30000
                    break;
                case '5만원 이하':
                    price = 50000
                    break;
                case '7만원 이하':
                    price = 70000
                    break;
                case '10만원 이하':
                    price = 100000
                    break;
                case '20만원 이하':
                    price = 200000
                    break;
                case '20만원 초과':
                    price = 1000000
                    break;
            }

            const data = await getSelectGoodsGiftList(selectedNavCategoryId, price)
            setGoodsArr(data.data)
        } catch (err) {

        }
        console.log(value, ' durltj qhdudi gka ')
    }

    const clickPriceFilterClose = () => {
        setPriceFilterState(false)
    }

    const clickPriceFilterSubmit = () => {
        setPriceFilterState(false)
    }


    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setStartX(event.clientX);
        setIsMouseDown(true);
        setScrollLeft(event.currentTarget.scrollLeft);
    };

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isMouseDown) return;
        const touchX = event.clientX;
        const deltaX = startX - touchX;
        event.currentTarget.scrollLeft = scrollLeft + deltaX;
    };

    const onMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const move = event.deltaY
        event.currentTarget.scrollLeft += move
    };

    const router = useRouter()

    const clickGoodsImage = (item:GoodsArrProps) => {
        console.log('xxxxx')
        useGoodsDetail.setState(item)
        router.push('/selectGoods/detail')
    }


    const [checkedGoods, setCheckedGoods] = useState<number[]>([]);


    const selectGoods = useUserSelectGoods(state => state.selectGoods); // 상태 구독


    const clickSelectGoods = (item: GoodsArrProps) => {
        console.log(item, checkedGoods, 'select goods ', selectGoods)

        interface GoodsIdProps {
            categoryId: number
            productId: number
        }
        interface SelectGoods {
            selectGoods: GoodsIdProps[]
        }



        let includeProductChecker: number[] = []

        selectGoods.forEach((ele)=> {
            includeProductChecker.push(ele.productId)
        })

        if (includeProductChecker.includes(item.id)) {
            useUserSelectGoods.setState((prevState) => {
                let updatedSelectCategory = [...prevState.selectGoods];

                updatedSelectCategory = updatedSelectCategory.filter((value) => {
                    return value.productId !== item.id
                })

                return {
                    selectGoods: updatedSelectCategory
                }
            })

        } else {
            useUserSelectGoods.setState((prevState)=>({
                selectGoods: [
                    ...prevState.selectGoods, {
                        categoryId: item.categoryId,
                        productId: item.id
                    }
                ]
            }))
        }


        if (checkedGoods.includes(item.id)) {
            const filterData = checkedGoods.filter((ele)=> {
                return item.id !== ele
            })

            setCheckedGoods(filterData)
        } else {
            setCheckedGoods((prevState) => {
                return [
                    ...prevState,
                    item.id,
                ]
            });
        }

    }

    const onClickCloseDialog = () => {
        setCategoryDialogState(false)
    }


    const [categoryDialogState, setCategoryDialogState] = useState(true)


    const [addCategoryArr, setAddCategoryArr] = useState<number[]>([])

    const selectCategory = useAddCategoryList(state => state.addCategory)
    const multipleData = useUserSelectGoodsBundleData(state => state.multiple)
    const singleData = useUserSelectGoodsBundleData(state => state.single)



    const test = () => {
        console.log(multipleData, singleData)
    }

    const clickAddCategory = async () => {

        try {
            const newDataArray = await Promise.all(selectCategory.map(async (ele) => {
                const data = await getSelectGoodsGiftList(ele.id, 1000000);
                return data.data
            }));

            setGoodsArr((prevState) => {
                const newState = [...prevState];

                newDataArray.forEach((data) => {
                    if (Array.isArray(data)) {
                        newState.push(...data);
                    } else {
                        newState.push(data);
                    }
                });

                return newState;
            });
            console.log(goodsArr)
        } catch (err) {
            console.log('fail add category goodss')
        }
    }


    const clickCompleteSelectGoods = async () => {
        try {
            const getBundleData = await postBundleList(selectGoods)
            await useUserSelectGoodsBundleData.setState({multiple: getBundleData.data.multiple, single: getBundleData.data.single})
            await router.replace('/selectGoods/showGiftList')
        } catch (err) {
            console.log('fail')
        }

    }
    useEffect(() => {
        getGoodsList()
    }, [])


    return (
        <div>
            <TestPageHeader
                navText={'상품 고르기'}
                rightIconArr={['close']}  // TestPageHeader에서 추가했어요 **************************************************
                title={'원하는 상품을 선택해주세요!'}
                progressWidth={'300px'}
            />



            <div className={'goods_list__layout__content'}>
                {/* <div className={'category_dialog__layout__menu__select'}> */}


                <div className='category_dialog__layout__menu w100'
                     onWheel={handleWheel}
                     onMouseDown={onMouseDown}
                     onMouseMove={onMouseMove}
                     onMouseUp={onMouseUp}
                     onMouseLeave={onMouseUp}
                >
                    <div className={'category_dialog__layout__menu__select'}>

                        <DefaultSelect type={'circle_select_sub_half'}
                                       clickSelectText={clickSelectAll} title={'수정'}/>
                    </div>
                    {
                        navCategoryList.map((item) => (
                            <div className={'category_dialog__layout__menu__select'} key={item.id}>
                                <DefaultSelect
                                    type={item.id === selectedNavCategoryId ? 'circle_select_sub_border_half_selected' : 'circle_select_sub_border_half'}
                                    title={item.name}
                                    item={item}
                                    clickSelect={() => clickNavCategory(item)}

                                />
                            </div>
                        ))
                    }


                </div>

                <div className={'goods_list__price_filter'}>
                    <button className={'btn__price_filter button__font'} onClick={clickSelectPrice}>
                        가격대 선택
                        <Image src={'/filter-down Icon.svg'} alt={'+'} width={20} height={20}/>
                    </button>
                </div>

                <div className={'goods_list__layout__products mt_16'}>
                    <div className={'goods_list__layout__content__product'}>
                        {
                            goodsArr.map((item, index) => (
                                <div className={'gift_list__layout__sub_content__single__layout_wrapper'} key={index}>
                                    <SmallProductComponent
                                        clickImageItem={() => clickGoodsImage(item)}
                                        price={item.price}
                                        text={item.name}
                                        item={item}
                                        bottomButtonLabel={'선택'}
                                        update={true}
                                        clickSmallProduct={() => clickSelectGoods(item)}
                                        checked={checkedGoods.includes(item.id)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div
                className={categoryDialogState ? 'user_category__dialog_up' : 'user_category__dialog_down'}>
                {/*className={'user_category__dialog_down'}>*/}
                <CategoryDialog closeDialog={onClickCloseDialog}/>

                <div className={'goods_list__layout__footer'}>
                    <DefaultButton label={`${selectCategory.length}개 선택`} type={'large_primary'}
                        buttonClick={clickAddCategory}
                    />
                </div>
            </div>



            {
                priceFilterState ?
                    <div>
                        <PriceFilter clickRadio={clickPriceFilterRadio}
                                     clickClose={clickPriceFilterClose}
                                     clickSubmit={clickPriceFilterSubmit}
                        />
                    </div> :

                    <div className={'goods_list__layout__footer'}>
                        <DefaultButton label={'완료'} type={'large_primary'}
                            buttonClick={clickCompleteSelectGoods}
                        />
                    </div>
            }


        </div>
    )
}

export default SelectGoods