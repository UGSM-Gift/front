'use client'
import NavLayout from "@/app/_component/NavLayout";
import Image from "next/image";
import './giftList.scss'
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import DefaultButton from "@/app/_component/DefaultButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSelectGiftListDetail} from "@/app/zustand/goodsStore";
import {getGiftListDetail} from "@/app/api/giftList";

interface callDataProps {
    anniversaryImageUrl: string
    anniversaryName: string
    availableAt: string
    expiredAt: string
    giftListId: number
    giftListImageUrl: string
    multipleGiftsCategories: any[]
    receivedProductsNumber: number
    selectedProductsNumber: number
    singleGiftCategories: any[]
    takerId: number
    takerNickname: string
}

const GiftList = () => {

    const [updateList, setUpdateList] = useState(false)

    const clickPencil = () => {
        setUpdateList(!updateList)
    }

    const [singleArr, setSingleArr] = useState([])
    const [multiArr, setMultiArr] = useState(
        []
    )


    const [anniversaryImageUrl, setAnniversaryImageUrl] = useState('')
    const [anniversaryName, setAnniversaryName] = useState('')
    const [availableAt, setAvailableAt] = useState('')
    const [expiredAt, setExpiredAt] = useState('')

    const [giftListId, setGiftListId] = useState(0)
    const [giftListImageUrl, setGiftListImageUrl] = useState('')
    const [multipleGiftsCategories, setMultipleGiftsCategories] = useState([])
    const [receivedProductsNumber, setReceivedProductsNumber] = useState(0)
    const [selectedProductsNumber, setSelectedProductsNumber] = useState(0)

    const [singleGiftCategories, setSingleGiftCategories] = useState([])
    const [takerId, setTakerId] =  useState(0)
    const [takerNickname, setTakerNickname] = useState('')


    const [callData, setCallData] = useState<callDataProps>({
        anniversaryImageUrl: "https://cloudfront.ugsm.co.kr/anniversary/ic-party-popper.png",
        anniversaryName: "생일",
        availableAt: "2024-04-28 00:00:00",
        expiredAt: "2024-04-30 23:59:59",
        giftListId: 29,
        giftListImageUrl: "http://cloudfront.ugsm.co.kr/user/12/gift-list/f54c871e-ec0c-4243-aae2-bca951065958",
        multipleGiftsCategories: [],
        receivedProductsNumber: 0,
        selectedProductsNumber: 0,
        singleGiftCategories: [],
        takerId: 12,
        takerNickname: "레트로감성479",
})


    const router = useRouter()

    const clickBack = () => {
        router.replace('/main')
    }
    const selectListDetailId = useSelectGiftListDetail(state => state.listId); // 상태 구독

    const callGiftListData = async () => {
        try {
            const callData = await getGiftListDetail(selectListDetailId)
            console.log(callData)

            setCallData(callData.data)


            setAnniversaryName(callData.data.anniversaryName)
            setAvailableAt(callData.data.availableAt)
            setExpiredAt(callData.data.expiredAt)
            setAnniversaryImageUrl(callData.data.anniversaryImageUrl)
            setMultiArr(callData.data.multipleGiftsCategories)
            setSingleArr(callData.data.singleGiftCategories)


        } catch (err) {

            console.log(err, 'fail err call Gift list Data')
        }
    }

    useEffect(() => {
        callGiftListData()
    }, [])


    return (
        <div>
            <div className={'col gift_list__layout'}>
                <NavLayout
                    leftIcon={'back'}
                    centerText={'선물리스트'}
                    rightIconArr={['pencil']}
                    clickPencil={clickPencil}
                    clickBack={clickBack}
                />
                <section className={'gift_list__layout_scroll'}>
                    <article className={'pr_16 pl_16 pt_14 gift_list__layout__content'}>
                        <section>
                            {
                                updateList ?
                                    <div>
                                        <h6 className={''}>
                                            포장 이미지
                                        </h6>
                                    </div>
                                    :
                                    <div>
                                        <p className={'bold__caption__font gray__color__50 mt_3'}>
                                            {callData.availableAt}
                                        </p>
                                        <h4 className={'gray__color__100 mt_8'}>
                                            [{callData.anniversaryName}] 선물 리스트
                                        </h4>
                                    </div>
                            }
                            <div className={'gift_list__layout__content__main_image mt_8'}>
                                <Image src={callData.giftListImageUrl} alt={'x'} width={343} height={200}/>
                            </div>
                            {updateList ?
                                <section className={'mt_5'}>
                                    <div>
                                        <h6>이벤트</h6>
                                        <div>

                                        </div>
                                    </div>
                                    <div>
                                        <h6>리스트 확인 기간</h6>
                                    </div>
                                </section>
                                :
                                <section className={'gift_list__layout__content__pick_product mt_5'}>
                                    <div className={'gift_list__layout__content__pick_product__article pl_14'}>
                                        <Image src={'/blue_present_icon.svg'} alt={'x'} width={24} height={24}/>
                                        <p className={'bold__caption__font gray__color__60 pl_10 pr_4 '}>고른 상품 수</p>
                                        <p className={'text__font gray__color__80'}>{callData.selectedProductsNumber} 개</p>
                                    </div>
                                    <div className={'gift_list__layout__content__pick_product__article'}>
                                        <Image src={'/present_box_heart_icon.svg'} alt={'x'} width={24} height={24}/>
                                        <p className={'bold__caption__font gray__color__60 pl_4 pr_4 '}>받은 상품 수</p>
                                        <p className={'text__font gray__color__80'}>{callData.receivedProductsNumber}개</p>
                                    </div>
                                </section>
                            }

                            <div className={'gift_list__layout__content__period'}>
                                <div className={'row'}>
                                    <p className={'text__font gray__color__60 pr_10'}>리스트 확인 기간: </p>
                                    <p className={'text__font gray__color__60'}>{new Date(callData.availableAt).toISOString().split('T')[0]}~{new Date(callData.expiredAt).toISOString().split('T')[0]}</p>
                                </div>
                                <div className={'pr_4'}>
                                    <Image src={'/share_icon.svg'} alt={'x'} width={24} height={24}/>
                                </div>
                            </div>
                        </section>

                    </article>
                    <div className={'gift_list__layout__content__divider mb_22'}>
                    </div>
                    <article className={'gift_list__layout__sub_content pr_16 pl_16'}>
                        <section>
                            <div>
                                <h5 className={'gray__color__80 mb_6'}>복수 상품 ({callData.multipleGiftsCategories.length})</h5>
                                <p className={'gray__color__50 bold__caption__font mb_2'}>한 상품 종류에 여러가지 상품을 선택하셨어요!</p>
                                <p className={'gray__color__50 bold__caption__font mb_10'}>선물받기 원하는 방식을 선택해주세요.</p>
                            </div>
                            <article className={'mb_14 gift_list__layout__sub_content__multi__layout'}>
                                {
                                    callData.multipleGiftsCategories.map((item, index) => (
                                        <div className={'gift_list__layout__sub_content__single__layout_wrapper'}
                                             key={index}>
                                            <SmallProductComponent
                                                title={`${item.productCategoryName}(${item.products.length})`}
                                                multi={true}

                                            />
                                        </div>
                                    ))
                                }

                            </article>
                        </section>
                        <div className={'gift_list__layout__sub_content__divider mb_16'}></div>
                        <section className={'gift_list__layout__sub_content__single'}>
                            <div className={''}>
                                <h5 className={'gray__color__80 mb_6'}>
                                    단일 상품 ({callData.singleGiftCategories.length})
                                </h5>
                                <p className={'gray__color__50 bold__caption__font mb_10'}>선택한 상품이 맞는지 확인해주세요</p>
                            </div>
                            <div className={'gift_list__layout__sub_content__single__layout'}>
                                {
                                    callData.singleGiftCategories.map((item, index) => (
                                        <div className={'gift_list__layout__sub_content__single__layout_wrapper'}
                                             key={index}>
                                            <SmallProductComponent
                                                text={item.products[0].name}
                                                price={item.products[0].price}
                                                update={updateList}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    </article>
                    <div className={'gift_list__bumper'}></div>
                </section>

                <div className={'gift_list__layout__footer'}>
                    <DefaultButton label={'받은 선물 확인하기'} type={'large_primary'}/>
                </div>
            </div>
        </div>
    )
}

export default GiftList