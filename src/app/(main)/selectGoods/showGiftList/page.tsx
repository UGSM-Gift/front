'use client'
import './showGiftList.scss';
import TestPageHeader from "@/app/_component/TestPageHeader";
import CategorySelectBox from "@/app/_component/CategorySelectBox";
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import {useUserSelectGoodsBundleData} from "@/app/zustand/goodsStore";
import DefaultButton from "@/app/_component/DefaultButton";
import NavLayout from "@/app/_component/NavLayout";
import Image from "next/image";
import {useState} from "react";


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

interface BundleMultiProps {
    categoryId: number
    categoryName: string
    products: GoodsArrProps[]
}


const ShowGiftList = () => {


    const multipleGoodsData = useUserSelectGoodsBundleData(state => state.multiple)
    const singleGoodsData = useUserSelectGoodsBundleData(state => state.single)


    const test = () => {
        console.log(selectCategoryData)
    }

    const [selectCategoryId, setSelectCategoryId] = useState(0)
    const [selectCategoryData, setSelectCategoryData] = useState<BundleMultiProps>()

    const clickMultiIcon = (item: any) => {
        console.log(item)
        setSelectCategoryId(item.categoryId)
        setSelectCategoryData(item)

    }

    const testComplete = () => {

    }

    const clickCloseModal = () => {
        setDisableLayout('')
    }

    const clickModalSubmit = () => {
        setDisableLayout('')
    }

    const openModal = () => {
        setDisableLayout('disabled_true')
    }

    const clickMultiModalSelect = (item:any) => {
        console.log(item)
    }

    const clickModalRadioButton = (value:string) => {
        if (value === 'all') {
            setAllRadio('/check_box_radio_true.svg')
            setOneRadio('/check_box_radio_false.svg')
        } else {
            setAllRadio('/check_box_radio_false.svg')
            setOneRadio('/check_box_radio_true.svg')
        }
    }

    const [allRadio, setAllRadio] = useState('/check_box_radio_false.svg')
    const [oneRadio, setOneRadio] = useState('/check_box_radio_false.svg')

    const [disableLayout, setDisableLayout] = useState('')


    return (
        <div>
            <TestPageHeader
                navText={'상품 고르기'}
                title={'user님의 선물 리스트를'}
                subTitle={'최종 확인해주세요'}
                content={'총 선택 상품 15개'}
                progressWidth={'343px'}
            />
            <div onClick={test}>asdfadfadsf</div>
            <div onClick={test}>asdfadfadsf</div>
            <div onClick={openModal}>asdfadfadsf</div>

            <section className={'mt_40'}>
                <article>
                    <div className={'bold__button__font row'}>
                        <p className={'mb_4'}>복수선택</p>
                        <p className={'ml_4 mr_4'} style={{color: '#E63A3A'}}>*</p>
                        <p className={'primary__color__800'}> {multipleGoodsData.length} </p>
                    </div>
                    <div className={'bold__caption__font gray__color__50 mb_20'}>
                        여러 상품 중 하나를 골라 선물해보세요
                    </div>
                    <div className={'show__gift__goods__cover'}>

                        {
                            multipleGoodsData.map((item, index) => (
                                <CategorySelectBox key={index}
                                                   text={item.categoryName}
                                                   checked={true}
                                                   length={item.products.length}
                                                   item={item}
                                                   clickImageItem={() => clickMultiIcon(item)}
                                />
                            ))
                        }
                    </div>


                </article>
                <div className={'divider_8px'}>
                </div>
                <article>
                    <div className={'bold__button__font row '}>
                        <p className={'mb_4'}> 단일 선택</p>
                        <p className={'primary__color__800 ml_10 '}> {singleGoodsData.length} </p>
                    </div>
                    <div className={'bold__caption__font gray__color__50 mb_20'}>
                        상품 하나를 선물해보세요
                    </div>
                    <div className={'show__gift__goods__cover'}>
                        {
                            singleGoodsData.map((item, index) => (
                                <SmallProductComponent
                                    key={index}
                                    price={item.products[0].price}
                                    text={item.products[0].name}
                                    update={true}
                                    bottomButtonLabel={'삭제'}
                                />
                            ))
                        }
                    </div>


                </article>
            </section>
            <section className={disableLayout}>

            </section>

            <section className={disableLayout === '' ? 'user_category__dialog_down' : 'user_category__dialog_up'}>
                <NavLayout
                    centerText={'가격대 선택'}
                    rightIconArr={['close']}
                    clickClose={clickCloseModal}
                    shadow={false}
                />
                <div className={'price_filter_content__layout'}>
                    <div className={'row'}>
                        <h5 className={'gray__color__80'}>선택상품</h5>
                        <div className={'primary__color__800'} >
                            {selectCategoryData?.products.length}
                        </div>
                    </div>

                    <div className={'price__product'}>

                        {selectCategoryData?.products.map((item, index) => (
                            <div
                                key={index}
                                style={{margin: '0 10px 0 0'}}
                            >
                                <SmallProductComponent
                                    price={item.price}
                                    text={item.name}
                                    item={item}
                                    clickSmallProduct={() => clickMultiModalSelect(item)}
                                />
                            </div>

                        ))
                        }
                    </div>
                    <div className={'divider_1px mt_16'}>
                    </div>
                    <article>
                        <h5 className={' mt_20 mb_10 gray__color__80'}>
                            해당 상품은 어떻게 받고 싶으신가요
                        </h5>

                        <div onClick={() => clickModalRadioButton('all')} className={'bold__text__font gray__color__80 row mb_10'}>
                            <Image src={allRadio} alt={''}  width={20} height={20} className={'mr_10'}/>

                            해당 카테고리에 선택된 제품 모두 선물로 받기
                        </div>
                        <div onClick={() => clickModalRadioButton('one')} className={'bold__text__font row mb_10 gray__color__80'}>
                            <Image src={oneRadio} alt={''}  width={20} height={20} className={'mr_10'}/>
                            해당 카테고리 중 상품 하나만 받기 (친구가 선택)
                        </div>
                    </article>

                </div>

                <div className={'price_filter__layout__footer'}>
                    <DefaultButton label={'완료'} type={'large_primary'} buttonClick={clickModalSubmit}/>
                </div>


            </section>


            <section className={'goods_list__layout__footer'}>
                <DefaultButton label={'완료'} type={'large_primary'}
                               buttonClick={testComplete}
                />
            </section>

        </div>
    ) // return END
} // END
export default ShowGiftList