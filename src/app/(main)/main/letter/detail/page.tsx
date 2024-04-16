'use client'
import './giftListLetterDetail.scss'
import NavLayout from "@/app/_component/NavLayout";
import Image from "next/image";
import LargeProductComponent from "@/app/(main)/_component/LargeProductComponent";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
const GiftListLetterDetail = () => {

    const router = useRouter()

    const clickBack = () => {
        router.replace('/main/letter')
    }

    return (
        <div>
            <NavLayout
                leftIcon={'back'}
                centerText={'편지'}
                clickBack={clickBack}
            />
            <section className={'gift_list_letter_detail__layout'}>
                <article>
                    <p className={'bold__caption__font gray__color__50 mb_8'}>보낸 날짜: 2023. 10. 29</p>
                    <h4 className={'gray__color__100 mb_10'}>무지개하늘586님께서 선물과 함께 편지를 보내셨어요!</h4>
                    <div className={'gift_list_letter_detail__layout__image mb_14'}>
                        <Image src={'/gift_list_main_image.svg'} alt={'x'} width={420} height={300}/>
                    </div>
                    <div className={''}>
                        <LargeProductComponent title={'디올ㅇㅁㅇㄹㅁㅇㄹㅁㄴㅇㄹ'} price={'31,000'} heartHide={true}/>
                    </div>
                </article>
            </section>
            <div className={'gift_list_letter_detail__divider'}></div>
            <section className={'gift_list_letter_detail__layout_sub'}>
                <h4 className={'gray__color__80 mt_2 mb_8'}>[eventName] 편지 내용</h4>
                <p className={'gray__color__50 bold__caption__font mb_14'}>이벤트 날짜: 2023. 10. 11</p>
                <p className={'gray__color__100 text__font'}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </section>
            <footer className={'gift_list_letter_detail__footer'}>
                <DefaultButton label={'확인'} type={'large_primary'} buttonClick={clickBack}/>
            </footer>
        </div>
    )
}

export default GiftListLetterDetail