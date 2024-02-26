'use client'
import NavLayout from "@/app/(main)/_component/NavLayout";
import Image from "next/image";
import './giftList.scss'
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import DefaultButton from "@/app/_component/DefaultButton";
import {useState} from "react";
import {useRouter} from "next/navigation";

const GiftList = () => {

    const [updateList, setUpdateList] = useState(true)

    const clickPencil = () => {
        setUpdateList(!updateList)
    }


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

    const multiArr =[
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ]

    const router = useRouter()

    const clickBack = () => {
        router.back()
    }

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
                                            23.10.16~10.25
                                        </p>
                                        <h4 className={'gray__color__100 mt_8'}>
                                            [생일] 선물 리스트
                                        </h4>
                                    </div>
                            }
                            <div className={'gift_list__layout__content__main_image mt_8'}>
                                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={343} height={200}/>
                            </div>
                            { updateList ?
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
                                        <p className={'text__font gray__color__80'}>15개</p>
                                    </div>
                                    <div className={'gift_list__layout__content__pick_product__article'}>
                                        <Image src={'/present_box_heart_icon.svg'} alt={'x'} width={24} height={24}/>
                                        <p className={'bold__caption__font gray__color__60 pl_4 pr_4 '}>받은 상품 수</p>
                                        <p className={'text__font gray__color__80'}>N개</p>
                                    </div>
                                </section>
                            }

                            <div className={'gift_list__layout__content__period'}>
                                <div className={'row'}>
                                    <p className={'text__font gray__color__60 pr_10'}>리스트 확인 기간: </p>
                                    <p className={'text__font gray__color__60'}>00.00.16~10.25</p>
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
                                <h5 className={'gray__color__80 mb_6'}>복수 상품 (N)</h5>
                                <p className={'gray__color__50 bold__caption__font mb_2'}>한 상품 종류에 여러가지 상품을 선택하셨어요!</p>
                                <p className={'gray__color__50 bold__caption__font mb_10'}>선물받기 원하는 방식을 선택해주세요.</p>
                            </div>
                            <article className={'mb_14 gift_list__layout__sub_content__multi__layout'}>
                                {
                                    multiArr.map((item)=> (
                                        <div className={'gift_list__layout__sub_content__single__layout_wrapper'} key={item.id}>
                                            <SmallProductComponent text={'암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용'}
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
                                    단일 상품 (N)
                                </h5>
                                <p className={'gray__color__50 bold__caption__font mb_10'}>선택한 상품이 맞는지 확인해주세요</p>
                            </div>
                            <div className={'gift_list__layout__sub_content__single__layout'}>
                                {
                                    smallArr.map((item) => (
                                        <div className={'gift_list__layout__sub_content__single__layout_wrapper'} key={item.id}>
                                            <SmallProductComponent text={'암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용'}
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