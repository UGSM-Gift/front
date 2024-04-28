'use client'
import'./packaging.scss';
import DefaultSelect from "@/app/_component/DefaultSelect";
import DefaultButton from '@/app/_component/DefaultButton';
import Image from "next/image";
import {useEffect, useState} from "react";
import NavLayout from "@/app/_component/NavLayout";
import Calendar from "@/app/(main)/_component/Calendar";
import {
    useUserPostGoodsData,
    useUserPostGoodsOnlyProductData, useUserPostGoodsSingleFilterData,
    useUserSelectGoods,
    useUserSelectGoodsBundleData
} from "@/app/zustand/goodsStore";
import {postGiftList} from "@/app/api/giftList";
import {useTestStore} from "@/app/zustand/testStore";
import {router} from "next/client";
import {useRouter} from "next/navigation";


const PackagePage  = () => {
    const selectGoods = useUserSelectGoods(state => state.selectGoods); // 상태 구독



    const imageFileName = useUserPostGoodsData(state => state.imageFileName); // 상태 구독
    const availableAt = useUserPostGoodsData(state => state.availableAt); // 상태 구독
    const expiredAt = useUserPostGoodsData(state => state.expiredAt); // 상태 구독
    const anniversaryId = useUserPostGoodsData(state => state.anniversaryId); // 상태 구독

    const singleFilterDataApi = useUserPostGoodsSingleFilterData(state => state.singleFilterData); // 상태 구독


    const singleData = useUserSelectGoodsBundleData(state => state.single)



    interface singleFilterDataProps {
        categoryId: number
        productIds: number[]
    }

    const [singleFilterData, setSingleFilterData] = useState<singleFilterDataProps[]>()


    const categoriesWithProducts = useUserPostGoodsOnlyProductData(state => state.categoriesWithProducts)
    const clickBack = () => {
        console.log(selectGoods, categoriesWithProducts, singleData)



        console.log(singleFilterData, singleFilterDataApi);


    }



    const [selectDayType, setSelectDayType] = useState('start')
    const [startDay, setStartDay] = useState('날짜 선택')
    const [endDay, setEndDay] = useState('날짜 선택')
    const onClickAddEvent = (val: string) => {
        setSelectDayType(val)
        setModalFlag(true)
    }

    const closeModal = () => {
        setModalFlag(false)
    }

    const [packageImages, setPackageImages] = useState([
        {
            id: 1,
            img: '/packaging_img_1.svg',
            radio: '/check_box_checked_tertiary_Icon.svg'
        },
        {
            id: 2,
            img: '/packaging_img_2.svg',
            radio: '/check_box_default_tertiary_Icon.svg'
        },
    ])

    const clickSelectImage = (item: any) => {
        console.log(item.id)

        if (item.id === 1) {
            setPackageImages([
                    {
                        id: 1,
                        img: '/packaging_img_1.svg',
                        radio: '/check_box_checked_tertiary_Icon.svg'
                    },
                    {
                        id: 2,
                        img: '/packaging_img_2.svg',
                        radio: '/check_box_default_tertiary_Icon.svg'
                    },
                ])
        } else {
            setPackageImages([
                {
                    id: 1,
                    img: '/packaging_img_1.svg',
                    radio: '/check_box_default_tertiary_Icon.svg'
                },
                {
                    id: 2,
                    img: '/packaging_img_2.svg',
                    radio: '/check_box_checked_tertiary_Icon.svg'
                },
            ])
        }
    }



    const clickDay = (day: any) => {
        if (selectDayType === 'start') {
            setStartDay(day)
            useUserPostGoodsData.setState({
                availableAt: day,
            });
        } else {
            setEndDay(day)
            useUserPostGoodsData.setState({
                expiredAt: day,
            });
        }
    }



    const [modalFlag, setModalFlag ] = useState(false)

    const router = useRouter()


    const settingValue = () => {
        const categoryIds = new Set();
        const duplicateCategoryIds = new Set();

        // 중복된 카테고리 아이디 찾기
        for (const { categoryId } of selectGoods) {
            if (categoryIds.has(categoryId)) {
                duplicateCategoryIds.add(categoryId);
            } else {
                categoryIds.add(categoryId);
            }
        }


        let noneArr = selectGoods.filter(({ categoryId }) => !duplicateCategoryIds.has(categoryId))

        const transformedGoods = noneArr.map(item => ({
            categoryId: item.categoryId,
            productIds: [item.productId]
        }));

        setSingleFilterData(transformedGoods)

        useUserPostGoodsSingleFilterData.setState({singleFilterData: transformedGoods})

    }

    useEffect(()=> {
        settingValue()
    },[])

    const clickSubmit = async () => {







        try {
            if (modalFlag) {
                // modal 창이 올라와 있을 때 , 달력에서 날짜를 고를 떄
                setModalFlag(false)
            } else {

                let postData = {
                    imageFileName: imageFileName,
                    availableAt: availableAt,
                    expiredAt: expiredAt,
                    anniversaryId: anniversaryId,
                    categoriesWithProducts: [...singleFilterDataApi, ...categoriesWithProducts]
                }


                const postGiftData = await postGiftList(postData);
                console.log(postGiftData);

                router.replace('/packaging/finishPackaging')

            }
        } catch (err) {
            console.log(err, 'fail package')
        }

    }
    return(
        <div className={"select_goods_packaging__layout"}>
            <NavLayout
                    leftIcon={'back'}
                    centerText={'포장하기'}
                    clickBack={clickBack}
            />

            <div className={'select_goods_packaging__contents'}>
                <div className={'mt_16 mb_44'}>
                    <h2 className={'gray__color__100'}>선물 리스트를</h2>
                    <h2 className={'gray__color__100'}>포장해주세요</h2>
                </div>

                {/* 포장 이미지 */}
                <div className={"select_img__layout"}>
                    <div className={"select_img_contents row "} >

                        {/*<div className={"self_add_image flex-center column"}>*/}
                        {/*    <Image src={'/add_gray_70_Icon.svg'} alt={'+'} width={24} height={24}/>*/}
                        {/*    <span className={"gray__color__60 caption__font"}>이미지 추가</span>*/}
                        {/*</div>*/}



                        {
                            packageImages.map((item, index)=> (
                                <div className={"provided_image"} onClick={() => clickSelectImage(item)} key={index}>
                                    <Image src={item.img} alt={'축하'}  width={80} height={80}/>
                                    <Image src={item.radio} alt={'+'} width={20} height={20} className={"radio_btn"}/>
                                </div>
                            ))
                        }


                    </div>

                    {/* 이미지 미선택한 경우 */}
                    {/*<div className={"packaging_img__default mt_16"}>*/}
                    {/*    <p className={"caption__font gray__color__60"}>선물 리스트를 포장할</p>*/}
                    {/*    <p className={"caption__font gray__color__60"}>이미지를 선택해주세요</p>                     */}
                    {/*</div>*/}

                    {/* 이미지 선택/ 추가한 경우 */}
                    <div className={"packaging_img__selected mt_16"}>

                        {
                            packageImages.map((ele,index) => (
                                <div key={index}>
                                    {
                                        ele.radio === '/check_box_checked_tertiary_Icon.svg' ?
                                            <Image src={ele.img} alt={'축하'}  width={343} height={172} />
                                            : <div></div>
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className={"divider_1px mt_24"}></div>

                {/* 기간 선택 */}
                <div className={"view_event_day__layout"}>
                    <div className={'mt_24 mb_16'}>
                        <h4 className={'gray__color__100'}>친구들이 해당 리스트를</h4>
                        <h4 className={'gray__color__100'}>언제까지 확인할 수 있나요?</h4>
                    </div>


                        <div className={'mb_12'}>
                            <h5>시작날짜</h5>
                            <DefaultSelect
                                imageUrl={'/calendar_icon.svg'}
                                type={'select_gray_border'}
                                clickSelectText={() => onClickAddEvent('start')}
                                title={startDay}
                            />
                        </div>
                        <div className={'mb_12'}>
                            <h5>종료날짜</h5>
                            <DefaultSelect
                                imageUrl={'/calendar_icon.svg'}
                                type={'select_gray_border'}
                                clickSelectText={() => onClickAddEvent('end')}
                                title={endDay}
                            />
                        </div>

                </div>
            </div>


            <div className={modalFlag ? 'user_category__dialog_up' : 'user_category__dialog_down'}>
                <NavLayout
                    centerText={'가격대 선택'}
                    rightIconArr={['close']}
                    clickClose={closeModal}
                    shadow={false}
                />
                <Calendar
                    clickDay={clickDay}
                />
            </div>

            <div className={'packaging__layout__footer'}>
                    <DefaultButton label={'확인'} type={'large_primary'}
                                   buttonClick={clickSubmit}
                    />
            </div>
            
        </div>
    )
}
export default PackagePage
