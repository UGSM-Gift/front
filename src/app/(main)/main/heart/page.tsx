'use client'
import './giftListHeart.scss'
import NavLayout from "@/app/(main)/_component/NavLayout";
import Image from "next/image";
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import {useRouter} from "next/navigation";
const GiftListHeart = () => {

    const present = true
    const heartSmallPresentArr = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
    ]

    const router = useRouter()

    const onClickBack = () => {
        router.back()
    }


    return (
        <div className={'gift_list_heart__layout'}>
            <NavLayout
                leftIcon={'back'}
                centerText={'찜'}
                clickBack={onClickBack}
            />
            <section className={'gift_list_heart__layout__content'}>
                {
                    present ?
                        <div className={'mb_20'}>
                            <article className={'gift_list_heart__layout__nav'}>
                                <p className={'gray__color__60 text__font'}>총 NN개</p>
                                <div className={'gift_list_heart__layout__nav_right'}>
                                    <p className={'gray__color__80 text__font'}>최근 찜한 순</p>
                                    <div>
                                        <Image src={'/bottom_arrow_icon.svg'} alt={'x'} width={24} height={24}/>
                                    </div>
                                </div>

                            </article>
                        </div>
                        :
                        <div className={'col gift_list_heart__layout__content_false'}>
                            <div className={'mb_22'}>
                                <Image src={'/null_image_icon.svg'} alt={'x'} width={100} height={100}/>
                            </div>
                            <h4 className={'gray__color__80 mb_4'}>좋아요한 상품이 없어요</h4>
                            <p className={'text__font gray__color__60'}>하트를 눌러 마음에 드는 상품을 저장하세요</p>
                        </div>
                }
                <article className={'gift_list_heart__layout__content__present'}>
                    {
                        heartSmallPresentArr.map((item)=> (
                            <div key={item.id}>
                                <SmallProductComponent
                                    text={'암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보'}
                                />
                            </div>
                        ))
                    }
                </article>
            </section>
        </div>
    )
}

export default GiftListHeart