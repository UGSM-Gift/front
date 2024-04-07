'use client'
import './goodsList.scss';
import DefaultSelect from "@/app/_component/DefaultSelect";
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import DefaultButton from "@/app/_component/DefaultButton";
import Image from "next/image";
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";
import {useEffect} from "react";
import {getRecommendedProduct} from "@/app/api/mainPage";


const GoodsList = () => {

    const smallArr =[
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
    ]

    const clickSelectAll = () => {
    }




    useEffect(()=> {
        console.log('ajdla?;;')
    },[])

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

                    
                <div className='category_dialog__layout__menu w100'>
                <div className={'category_dialog__layout__menu__select'}>

                    <DefaultSelect type={'circle_select_sub_half'}
                                   clickSelectText={clickSelectAll} title={'수정'}/>
                    {/* 수정 버튼으로 카테고리 추천 페이지로 이동해야하는데 제가 뭔지 몰라서 CategoryDialog.tsx에서 그대로 긁어오고 필요없어 보이는 건 주석처리했어요..;;;;;;; (0. < -☆)

                        {
                        selectedContent.content.length > 0 &&
                        <div className={'category_dialog__layout__menu__select__number'}>
                            {selectedContent.content.length}
                        </div>
                    } */}
                </div>
                {/* {
                    categoryTitle.map((item, index) => (
                        <div className={'category_dialog__layout__menu__select'}
                             key={index}
                        >


                            <DefaultSelect type={selectedContent[item.id] > 0 ? 'circle_select_sub_border_half_selected': 'circle_select_sub_border_half'}
                                           clickSelect={() => clickSelectCategoryTitle(item)}
                                           title={item.name}
                                           item={item}
                            />
                            {
                                selectedContent[item.id] ?
                                <div className={'category_dialog__layout__menu__select__number'}>
                                    {selectedContent[item.id]}
                                </div> : <div className={'mb_20'}></div>
                            }
                        </div>
                    ))
                } */}


                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   title={'유아'}/>
                </div>
                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   title={'식품'}/>
                </div>
                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   title={'유아'}/>
                </div>
                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   title={'식품'}/>
                </div>
                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   title={'유아'}/>
                </div>
                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   title={'식품'}/>
                </div>

            </div>

                    <div className={'goods_list__price_filter'}>
                        <button className={'btn__price_filter button__font'}>
                            가격대 선택
                            <Image src={'/filter-down Icon.svg'} alt={'+'} width={20} height={20}/>
                        </button>
                    </div>
                {/* </div> */}

                <div className={'goods_list__layout__products mt_16'}>
                    <div className={'goods_list__layout__content__product'}>
                        {
                            smallArr.map((item) => (
                                <div className={'gift_list__layout__sub_content__single__layout_wrapper'} key={item.id}>
                                    <SmallProductComponent text={'암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용'}
                                                        update={true}
                                    />
                                    {/* SmallProductComponent/ .small__product__layout에 margin-bottom:20px 삽입 */}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className={'goods_list__layout__footer'}>
                <DefaultButton label={'완료'} type={'large_primary'}/>
            </div>

        </div>
    )
}


export default GoodsList